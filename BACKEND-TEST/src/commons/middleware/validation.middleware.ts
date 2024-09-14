import { NextFunction, Response } from "express";
import { body, validationResult } from "express-validator"
import { Request } from "express-validator/lib/base";

export const CreateMemberAuth = [
    body("name")
        .isString().withMessage("NAME_MUST_BE_STRING")
        .isLength({ min: 3, max: 55 }).withMessage("NAME_LENGTH_MUST_BE_3_255")
        .notEmpty().withMessage("NAME_IS_REQUIRED"),

    body("password")
        .isString().withMessage("PASSWORD_ MUST_BE_STRING")
        .isLength({ min: 5, max: 255 }).withMessage("PASSWORD_LENGTH_MUST_BE_5")
        .notEmpty().withMessage("PASSWORD_IS_REQUIRED"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array().map((error: any) => ({
                    field: error.path,
                    message: error.msg
                }))
            });
        }
        next();
    }
]


export const CreateBooks = [
    body("title")
        .isString().withMessage("TITLE_MUST_BE_STRING")
        .isLength({ min: 3, max: 255 }).withMessage("TITLE_LENGTH_MIN_3_CHAR")
        .notEmpty().withMessage("TITLE_IS_REQUIRED"),
    body("author")
        .isString().withMessage("AUTHOR_MUST_BE_STRING")
        .isLength({ min: 3, max: 50 }).withMessage("AUTHOR_LENGTH_MIN_3_CHAR")
        .notEmpty().withMessage("AUTHOR_IS_REQUIRED"),
    body("code")
        .isString().withMessage("CODE_MUST_BE_STRING")
        .isLength({ min: 3, max: 255 }).withMessage("CODE_LENGTH_MIN_3_CHAR")
        .notEmpty().withMessage("CODE_IS_REQUIRED"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array().map((error: any) => ({
                    field: error.path,
                    message: error.msg
                }))
            });
        }
        next();
    }
]

export const UpdateBooks = [
    body("title")
        .optional().isString().withMessage("TITLE_MUST_BE_STRING")
        .isLength({ min: 3, max: 255 }).withMessage("TITLE_LENGTH_MIN_3_CHAR"),
    body("author")
        .optional().isString().withMessage("AUTHOR_MUST_BE_STRING")
        .isLength({ min: 3, max: 50 }).withMessage("AUTHOR_LENGTH_MIN_3_CHAR"),
    body("code")
        .optional().isString().withMessage("CODE_MUST_BE_STRING")
        .isLength({ min: 3, max: 255 }).withMessage("CODE_LENGTH_MIN_3_CHAR"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array().map((error: any) => ({
                    field: error.path,
                    message: error.msg
                }))
            });
        }
        next();
    }
]



export const CreateBorrowBook = [
    body("code")
        .isString().withMessage("CODE_MUST_BE_STRING")
        .isLength({ min: 3, max: 255 }).withMessage("CODE_LENGTH_MIN_3_CHAR")
        .notEmpty().withMessage("CODE_BOOK_REQRUIDED"),
    body("title")
        .isString().withMessage("TITLE_MUST_BE_STRING")
        .isLength({ min: 3, max: 255 }).withMessage("CODE_LENGTH_MIN_3_CHAR")
        .notEmpty().withMessage("TITLE_REQRUIEDED"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array().map((error: any) => ({
                    field: error.path,
                    message: error.msg
                }))
            });
        }
        next();
    }
]