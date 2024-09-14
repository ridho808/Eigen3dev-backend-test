import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const MemberCode = async (): Promise<string> => {
    const lastMember = await prisma.member.findFirst({
        orderBy: {
            id: 'desc',
        },
    })
    const nextNumber = lastMember ? lastMember.id + 1 : 1
    const code = `M${nextNumber.toString().padStart(3, '0')}`

    return code
}