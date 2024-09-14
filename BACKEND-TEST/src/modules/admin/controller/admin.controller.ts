import { Response, Request } from "express"
import { AsyncHandler, JWTUtils, SetCookieUtils, payload } from "@utils"
import AdminServices from "../services/admin.service"


export default class adminController extends AsyncHandler {

    constructor() {
        super()
    }
    // ADMIN/SIGNUP
    static Signup = this.handleRequest(async (req: Request, res: Response) => {
        const data = req.body
        const admin = await AdminServices.SignupService(data)
        SetCookieUtils.setCookie(res, admin.access_token, admin.refresh_token)

        return {
            status: 201,
            message: "Admin signed up successfully",
            tokens: admin
        }
    })
    // ADMIN/SIGNIN
    static Signin = this.handleRequest(async (req: Request, res: Response) => {
        const data = req.body
        const admin = await AdminServices.SignInService(data)
        SetCookieUtils.setCookie(res, admin.access_token, admin.refresh_token)

        return {
            status: 200,
            message: "Admin signed in successfully",
            tokens: admin
        }
    })

    // ADMIN/SIGNOUT
    static Signout = this.handleRequest(async (req: Request, res: Response) => {
        res.clearCookie("access_token")
        res.clearCookie("refresh_token")
        return {
            status: 200,
            message: "Member signed out successfully"
        }
    })

    static RefreshToken = this.handleRequest(async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refresh_token
        const decoded = JWTUtils.verifyToken(refreshToken) as payload
        if (!decoded) return res.status(401).json({ message: "Unauthorized" })
        const payload = {
            id: decoded.id,
            code: decoded.code,
            name: decoded.name,
            role: decoded.role,
            password: undefined
        }
        const access_token = JWTUtils.generateToken(payload, "30m")
        const refresh_token = JWTUtils.generateToken(payload, "1d")

        SetCookieUtils.setCookie(res, access_token, refresh_token)
        return {
            status: 200,
            message: "Access token refreshed successfully",
            tokens: { access_token, refresh_token }
        }
    })
}