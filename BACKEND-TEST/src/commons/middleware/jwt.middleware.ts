import { JWTUtils, payload } from "@utils"
import { Request, Response } from "express"
import { JsonWebTokenError, JwtPayload } from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
export class JwtMiddleware {
    private static prisma: PrismaClient = new PrismaClient()

    static verifyToken = (req: Request, res: Response, next: any) => {
        try {
            const authHeader = req.headers["authorization"]
            const token = authHeader && authHeader.split(" ")[1]
            if (!token) return res.status(401).json({ message: "UnAuthorized" })

            const decoded = JWTUtils.verifyToken(token) as JwtPayload
            if (!decoded) return res.status(401).json({ message: "UnAuthorized" })

            const code = decoded.code
            const member = this.prisma.member.findUnique({
                where: {
                    code: code
                }
            })
            if (!member) return res.status(401).json({ message: "UnAuthorized" })
            next()
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                return res.status(401).json({ message: error.message })
            }
        }
    }

    static VerifyRefreshToken = async (req: Request, res: Response, next: any) => {
        try {
            const refreshToken = req.cookies.refresh_token
            if (!refreshToken) return res.status(401).json({ message: "UnAuthorized" })
            const decoded = JWTUtils.verifyToken(refreshToken) as payload
            const member = await this.prisma.member.findUnique({
                where: {
                    id: decoded.id
                }
            })
            if (!member) return res.status(401).json({ message: "UnAuthorized" })
            next()
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                return res.status(401).json({ message: error.message })
            }
        }
    }

    static VerifyAdmin = async (req: Request, res: Response, next: any) => {
        try {
            const authHeader = req.headers["authorization"]
            const token = authHeader && authHeader.split(" ")[1]
            if (!token) return res.status(401).json({ message: "UnAuthorized" })
            const decoded = JWTUtils.verifyToken(token) as payload
            if (!decoded || decoded.role !== "admin") return res.status(401).json({ message: "Unauthorize" })
            const admin = await this.prisma.member.findFirst({
                where: {
                    name: decoded.name
                }
            })
            if (!admin) return res.status(401).json({ message: "Unauthorize" })
            next()
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                return res.status(401).json({ message: error.message })
            }
        }

    }

    static VerifyAdminRefresh = async (req: Request, res: Response, next: any) => {
        try {
            const refreshToken = req.cookies.refresh_token
            if (!refreshToken) return res.status(401).json({ message: "Unauthorize" })
            const decoded = JWTUtils.verifyToken(refreshToken) as payload
            if (!decoded || decoded.role !== "admin") return res.status(401).json({ message: "Unauthorize" })
            const admin = await this.prisma.member.findFirst({
                where: {
                    name: decoded.name
                }
            })
            if (!admin) return res.status(401).json({ message: "Unauthorize" })
            next()
        } catch (error) {
            if (error instanceof JsonWebTokenError) return res.status(401).json({
                message: error.message
            })
        }
    }

}