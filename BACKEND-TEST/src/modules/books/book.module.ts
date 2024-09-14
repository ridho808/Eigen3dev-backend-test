import { Router } from "express"
import BookController from "./controller/book.controller"
import { CreateBooks, JwtMiddleware, UpdateBooks } from "@middleware/validator"

const router = Router()

router.get("/available", BookController.AvailableBooks)
router.get("/unavailable", BookController.UnavailableBooks)
router.get("/author", BookController.AuthorBooks)
router.get("/:id", BookController.OneBookById)
router.get("/", BookController.AllBooks)
router.post("/", JwtMiddleware.VerifyAdmin, CreateBooks, BookController.AddOneBooks)
router.patch("/:id", JwtMiddleware.VerifyAdmin, UpdateBooks, BookController.UpdateOneBook)
router.delete("/:id", JwtMiddleware.VerifyAdmin, BookController.DeleteOneBook)

export default (app: Router) => {
    app.use("/books", router)
}