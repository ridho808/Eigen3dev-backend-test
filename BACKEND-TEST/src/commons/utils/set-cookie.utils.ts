import { Response } from "express"


export class SetCookieUtils {
    static setCookie = (res: Response, access_token: string, refresh_token: string) => {
        res.cookie("access_token", access_token, { maxAge: 30 * 60 * 1000, httpOnly: true })
        res.cookie("refresh_token", refresh_token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
    }
}