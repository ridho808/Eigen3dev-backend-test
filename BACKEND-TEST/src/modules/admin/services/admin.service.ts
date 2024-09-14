import { PrismaClient } from "@prisma/client";
import { AdminType } from "../types/admin.type";
import { BcryptUtils, JWTUtils, MemberCode } from "@utils";


export default class AdminServices {
    private static prisma: PrismaClient = new PrismaClient()

    // REGISTATION / SIGNUP ADMIN
    static async SignupService(Data: AdminType) {
        const findAdmin = await this.prisma.member.findFirst({
            where: {
                name: Data.name
            }
        });
        if (findAdmin) throw { status: 400, message: "ADMIN_ALREADY_EXISTS" }
        const adminRole = await this.prisma.role.findFirst({ where: { name: "admin" } })
        if (!adminRole) throw { status: 400, message: "ADMIN_ROLE_NOT_FOUND" }
        const hashPassword = await BcryptUtils.hashPassword(Data.password)
        const admin = await this.prisma.member.create({
            data: {
                code: await MemberCode(),
                name: Data.name,
                password: hashPassword,
                role_id: adminRole.id,
            },
            include: {
                role: true,
            }
        })
        const payload = {
            ...admin,
            role: admin.role?.name,
            password: undefined
        }

        const access_token = JWTUtils.generateToken(payload, "30m")
        const refresh_token = JWTUtils.generateToken(payload, "1d")

        return {
            access_token,
            refresh_token,
        }
    }

    // LOGIN / SIGNIN ADMIN
    static async SignInService(Data: AdminType) {
        const admin = await this.prisma.member.findFirst({
            where: {
                name: Data.name
            },
            include: {
                role: true,
            }
        })
        if (!admin) throw { status: 404, message: "ADMIN_NOT_FOUND" }
        const comparePassword = await BcryptUtils.comparePassword(Data.password, admin.password)
        if (!comparePassword) throw { status: 400, message: "INCORRECT_PASSWORD" }
        const payload = {
            ...admin,
            role: admin.role?.name,
            password: undefined
        }
        const access_token = JWTUtils.generateToken(payload, "30m")
        const refresh_token = JWTUtils.generateToken(payload, "1d")
        return {
            access_token,
            refresh_token,
        }
    }


}