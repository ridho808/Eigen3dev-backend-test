import { PrismaClient } from "@prisma/client";
import { MemberType } from "../types/authenticate.type";
import { MemberCode } from "@utils";
import { BcryptUtils, JWTUtils } from "@utils"

export class AuthenticateServices {
    private static prisma: PrismaClient = new PrismaClient();

    // REGISTRATION/SIGNUP
    static SignupService = async (data: MemberType) => {
        const findmember = await this.prisma.member.findFirst({
            where: {
                name: data.name
            }
        });
        if (findmember) throw { status: 400, message: "MEMBER_ALREADY_EXISTS" }

        const role = await this.prisma.role.findFirst({ where: { name: "member" } })
        if (!role) throw { status: 400, message: "ROLE IS NULL" }

        const member = await this.prisma.member.create({
            data: {
                code: await MemberCode(),
                name: data.name,
                password: await BcryptUtils.hashPassword(data.password),
                role_id: role?.id
            },
            select: {
                id: true,
                code: true,
                name: true,
                role: {
                    select: {
                        name: true
                    }
                }
            }
        })
        const payload = {
            ...member,
            role: member.role?.name,
            password: undefined
        }
        const access_token = JWTUtils.generateToken(payload, '10m')
        const refresh_token = JWTUtils.generateToken(payload, '24h')

        return {
            access_token,
            refresh_token
        }
    }

    // LOGIN/SIGNIN
    static SigninService = async (data: MemberType) => {
        const member = await this.prisma.member.findFirst({
            where: {
                name: data.name
            },
            select: {
                id: true,
                code: true,
                name: true,
                password: true,
                role: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if (!member) throw { status: 404, message: "MEMBER_NOT_FOUND" }
        const checkPassword = await BcryptUtils.comparePassword(data.password, member.password)
        if (!checkPassword) throw { status: 400, message: "INCORRECT_PASSWORD" }
        const payload = {
            ...member,
            role: member.role?.name,
            password: undefined,
        }
        const access_token = JWTUtils.generateToken(payload, '10m')
        const refresh_token = JWTUtils.generateToken(payload, '24h')

        return {
            access_token,
            refresh_token
        }
    }

}