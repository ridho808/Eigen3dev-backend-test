import express, { NextFunction, Request, Response } from 'express'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import Swaggeriu from 'swagger-ui-express'
import swagger from "./config/swagger.json"
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import adminModule from '@admin/module'
import authenticateModule from '@auth/module'
import memberModule from '@member/module'
import borrowbookModule from '@borrowbooks/module'
import bookModule from '@books/module'

const app = express()

app.use(morgan("dev"))
app.use("/api-docs", Swaggeriu.serve, Swaggeriu.setup(swagger))
app.use(express.json())
app.use(cookieParser())

// ROUTES
authenticateModule(app)
adminModule(app)
bookModule(app)
memberModule(app)
borrowbookModule(app)
// ROUTES


/* ERROR HANDLER */
app.use((req, res, next) => {
    const error = new Error("Not found");
    next(error)
});
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            return res.status(404).json({ message: "FIELD_ERROR", meta: error.meta })
        }
    }
    res.status(error.status || 404).json({ message: error.message })
});
/* ERROR HANDLER */


export default app;