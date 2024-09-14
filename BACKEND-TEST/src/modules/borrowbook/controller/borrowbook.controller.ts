import { Request, Response } from "express"
import { AsyncHandler, JWTUtils, payload } from "@utils"
import BorrowbookService from "../services/borrowbook.services"


export default class BorrowBookController extends AsyncHandler {
    constructor() {
        super()
    }

    static claimBook = this.handleRequest(async (req: Request, res: Response) => {
        const token = req.cookies.access_token
        const book = req.body
        const decoded = JWTUtils.verifyToken(token) as payload

        const borrow = await BorrowbookService.claim(book, decoded.id)
        return {
            status: 200,
            message: "Borrow a Book successfully",
            borrow
        }
    })


    static ReturnBook = this.handleRequest(async (req: Request, res: Response) => {
        const token = req.cookies.access_token
        const book = req.body
        const decoded = JWTUtils.verifyToken(token) as payload
        const borrow = await BorrowbookService.returnBook(book, decoded.id)
        return {
            status: 200,
            message: "Return a Book successfully",
            borrow
        }
    })
}