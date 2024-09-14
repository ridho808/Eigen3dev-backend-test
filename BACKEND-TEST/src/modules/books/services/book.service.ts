import { PrismaClient } from "@prisma/client"
import { BookType } from "../types/book.type"


export default class BookService {
    private static prisma: PrismaClient = new PrismaClient()

    static getAllBooks = async () => {
        const books = await this.prisma.book.findMany({ where: { is_available: true }, orderBy: { updated_at: "desc" } })
        return books
    }

    static getOneBook = async (id: number) => {
        const books = await this.prisma.book.findFirst({
            where: {
                id
            }
        })
        if (!books) throw { status: 404, message: "BOOK_NOT_FOUND" }
        return books
    }

    static getAuthorBook = async (author: string) => {

        const books = await this.prisma.book.findMany({
            where: {
                author
            }
        })
        if (!books.length) throw { status: 404, message: "AUTHOR_NOT_FOUND" }
        return books
    }

    static getAvailableBooks = async () => {
        const books = await this.prisma.book.findMany({
            where: {
                is_available: true
            }
        })
        if (!books) throw { status: 404, message: "AVAILABLE_BOOKS_NOT_FOUND" }
        return books
    }

    static getUnavailableBooks = async () => {
        const books = await this.prisma.book.findMany({
            where: {
                is_available: false
            }
        })
        if (!books) throw { status: 404, message: "UNAVAILABLE_BOOKS_NOT_FOUND" }
        return books
    }

    static addBook = async (book: BookType) => {
        const existingBook = await this.prisma.book.findFirst({
            where: {
                title: book.title
            }
        })
        if (existingBook) throw { status: 400, message: "BOOK_ALREADY_EXISTS" }
        const newBook = await this.prisma.book.create({
            data: book
        })
        return newBook
    }

    static updateBook = async (id: number, book: BookType) => {
        const existingBook = await this.prisma.book.findFirst({
            where: {
                id
            }
        })
        if (!existingBook) throw { status: 404, message: "BOOK_NOT_FOUND" }
        const updatedBook = await this.prisma.book.update({
            where: {
                id
            },
            data: book
        })
        return updatedBook
    }

    static deleteBook = async (id: number) => {
        const existingBook = await this.prisma.book.findFirst({
            where: {
                id
            }
        })
        if (!existingBook) throw { status: 404, message: "BOOK_NOT_FOUND" }
        const deletedBook = await this.prisma.book.delete({
            where: {
                id
            }
        })
        return deletedBook
    }


}

