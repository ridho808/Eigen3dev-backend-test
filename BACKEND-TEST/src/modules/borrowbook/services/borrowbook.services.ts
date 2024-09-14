import { PrismaClient } from "@prisma/client"
import { BorrowBookType } from "../types/borrowbook.controller"
import moment from "moment"

export default class BorrowbookService {
    private static prisma: PrismaClient = new PrismaClient()

    static async claim(data: BorrowBookType, memberId: number) {
        const book = await this.prisma.book.findFirst({ where: { code: data.code, title: data.title } })
        if (!book) throw { status: 404, message: "BOOK_NOT_FOUND" }
        if (!book.is_available) throw { status: 400, message: "BOOK_NOT_AVAILABLE" }

        const member = await this.prisma.member.findFirst({
            where: { id: memberId },
            select: { borrowed_count: true, penalties: true }
        })
        if (!member) throw { status: 404, message: "MEMBER_NOT_FOUND" }
        if (member.borrowed_count == 2) throw { status: 400, message: "LIMIT_BORROW_BOOK" }
        if (member.penalties.length) throw { status: 400, message: "MEMBER_HAVE_PINALTIES" }
        /** RETURN BOOK HARUS TRUE **/
        const existborrow = await this.prisma.borrowbook.findFirst({ where: { book_code: data.code } })

        if (existborrow?.status_return == false) throw { status: 409, message: "MEMBER_NOT_RETUNTED_THE_BOOK" }

        const borrowedBook = await this.prisma.borrowbook.create({
            data: {
                book_code: data.code,
                member_id: memberId,
            },
            select: { book: { select: { title: true, code: true, author: true } } }
        })
        await this.prisma.book.update({
            where: { code: data.code },
            data: {
                stock: { decrement: 1 },
                is_available: {
                    set: (await this.prisma.book.findUnique({ where: { code: data.code } }))?.stock === 1 ? false : true
                }
            },

        })
        await this.prisma.member.update({
            where: { id: memberId },
            data: {
                borrowed_count: { increment: 1 },
            }
        })
        return borrowedBook
    }

    static async returnBook(data: BorrowBookType, memberId: number) {
        const existBorrow = await this.prisma.borrowbook.findFirst({
            where: { book_code: data.code, member_id: memberId, status_return: false },
            include: { member: true },
        })
        if (!existBorrow) throw { status: 404, message: "BORROWED_BOOK_NOT_FOUND" }
        const borrowedBook = await this.prisma.borrowbook.update({
            where: { id: existBorrow.id },
            data: { status_return: true, return_date: new Date() }
        })

        const returnday = moment(existBorrow.borrow_date).format("YYYY-MM-DD")
        const compireday = moment().diff(returnday, 'days') > 7
        const threeday = moment().add(3, "days").toISOString()
        console.log(compireday);

        if (compireday) await this.prisma.penalty.create({ data: { member_id: memberId, end_date: threeday } })

        await this.prisma.book.update({
            where: { code: data.code },
            data: {
                stock: { increment: 1 },
                is_available: {
                    set: (await this.prisma.book.findUnique({ where: { code: data.code } }))?.stock == 1 ? false : true
                }
            }
        })
        await this.prisma.member.update({
            where: { id: memberId },
            data: {
                borrowed_count: { decrement: 1 },
            }
        })
        return borrowedBook
    }

}