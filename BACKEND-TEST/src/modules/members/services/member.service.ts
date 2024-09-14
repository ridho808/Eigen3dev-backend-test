import { PrismaClient } from "@prisma/client"


export default class MemberService {
    private static prisma: PrismaClient = new PrismaClient()

    static async getAllMembers() {
        const member = await this.prisma.member.findMany({
            select: {
                id: true,
                name: true,
                code: true,
                borrowed_count: true,
                borrowed_books: {
                    where: {
                        status_return: false
                    },
                    select: { book_code: true, borrow_date: true, status_return: true }
                },
            }
        })
        return member
    }

    static async getMemberById(id: number) {
        const member = await this.prisma.member.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                code: true,
                borrowed_count: true,
                borrowed_books: {
                    where: {
                        status_return: false
                    },
                    select: { book_code: true, borrow_date: true, status_return: true }
                }
            }
        })
        if (!member) throw { status: 404, message: "MEMBER_NOT_FOUND" }
        return member
    }

    static async MemberPenalties() {
        const members = await this.prisma.penalty.findMany({
            include: {
                member: {
                    select: {
                        name: true,
                        code: true,
                    }
                }
            }
        })
        return members
    }
}