import { Request, Response } from "express";
import { AsyncHandler } from "@utils";
import BookService from "@books/service"

export default class BookController extends AsyncHandler {
    constructor() {
        super()
    }

    static AllBooks = this.handleRequest(async (req: Request, res: Response) => {
        const books = await BookService.getAllBooks()
        return {
            status: 200,
            message: "Success Gets all books",
            books: books
        }
    })

    static OneBookById = this.handleRequest(async (req: Request, res: Response) => {
        const { id } = req.params
        const book = await BookService.getOneBook(+id)
        return {
            status: 200,
            message: "Success Get book by id",
            books: book
        }
    })


    static AuthorBooks = this.handleRequest(async (req: Request, res: Response) => {
        const { name } = req.query
        const book = await BookService.getAuthorBook(name as string)
        return {
            status: 200,
            message: "Success Get books by author",
            books: book
        }
    })

    static AvailableBooks = this.handleRequest(async (req: Request, res: Response) => {
        const book = await BookService.getAvailableBooks()
        return {
            status: 200,
            message: "Success Get available books",
            books: book
        }
    })

    static UnavailableBooks = this.handleRequest(async (req: Request, res: Response) => {
        const book = await BookService.getUnavailableBooks()
        return {
            status: 200,
            message: "Success Get unavailable books",
            books: book
        }
    })

    static AddOneBooks = this.handleRequest(async (req: Request, res: Response) => {
        const data = req.body
        const book = await BookService.addBook(data)
        return {
            status: 201,
            message: "Success Add book",
            books: book
        }
    })

    static UpdateOneBook = this.handleRequest(async (req: Request, res: Response) => {
        const { id } = req.params
        const data = req.body
        const book = await BookService.updateBook(+id, data)
        return {
            status: 200,
            message: "Success Update book",
            books: book
        }
    })

    static DeleteOneBook = this.handleRequest(async (req: Request, res: Response) => {
        const { id } = req.params
        const book = await BookService.deleteBook(+id)
        return {
            status: 200,
            message: "Success Delete book",
            books: book
        }
    })


}