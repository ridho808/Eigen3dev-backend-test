import { Request, Response } from 'express'
import { AsyncHandler, JWTUtils, SetCookieUtils, payload } from '@utils';
import { AuthenticateServices } from '../services/authenticate.services';


class AuthenticateController extends AsyncHandler {
    constructor() { super() }

    static Signup = this.handleRequest(async (req: Request, res: Response) => {
        const data = req.body
        let member = await AuthenticateServices.SignupService(data)
        SetCookieUtils.setCookie(res, member.access_token, member.refresh_token)
        return {
            status: 201,
            message: "Member created successfully",
            tokens: member
        }
    })

    static Signin = this.handleRequest(async (req: Request, res: Response) => {
        const data = req.body
        let member = await AuthenticateServices.SigninService(data)
        SetCookieUtils.setCookie(res, member.access_token, member.refresh_token)
        return {
            status: 200,
            message: "Member signed in successfully",
            tokens: member,
        }
    })

    static Signout = this.handleRequest(async (req: Request, res: Response) => {
        res.clearCookie("access_token")
        res.clearCookie("refresh_token")
        return {
            status: 200,
            message: "Member signed out successfully",
        }
    })

    static RefreshToken = this.handleRequest(async (req: Request, res: Response) => {
        const refreshToken = req.cookies["refresh_token"]
        const decoded = JWTUtils.verifyToken(refreshToken) as payload

        if (!decoded) return res.status(401).json({ message: "Unauthorized" })
        const Payload = {
            id: decoded.id,
            code: decoded.code,
            name: decoded.name,
            role: decoded.role,
            password: undefined
        }
        const access_token = JWTUtils.generateToken(Payload, "30m")
        const refresh_token = JWTUtils.generateToken(Payload, "1d")
        SetCookieUtils.setCookie(res, access_token, refresh_token)

        return {
            status: 200,
            message: "Token refreshed successfully",
            tokens: { access_token, refresh_token }
        }
    })
}


export default AuthenticateController;
