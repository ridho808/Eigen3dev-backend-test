import { Router } from "express"
import BorrowBookController from "./controller/borrowbook.controller"
import { CreateBorrowBook, JwtMiddleware } from "@middleware/validator"

const router = Router()

router.post("/", JwtMiddleware.verifyToken, CreateBorrowBook, BorrowBookController.claimBook)
router.post("/returnbook", JwtMiddleware.verifyToken, CreateBorrowBook, BorrowBookController.ReturnBook)

export default (app: Router) => {
    app.use("/borrowbooks", router)
}