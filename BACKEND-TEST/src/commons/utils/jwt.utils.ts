import jsonwebtoken from "jsonwebtoken";
import { config } from "@config/config-app";
export interface payload {
    id: number
    code: string,
    name: string,
    role: string | undefined,
    password: undefined
}

export class JWTUtils {

    static generateToken = (payload: payload, expiresIn: string) => {
        return jsonwebtoken.sign(payload, config.JWT_SECRET, { expiresIn });
    }

    static verifyToken = (token: string) => {
        return jsonwebtoken.verify(token, config.JWT_SECRET);
    }

}