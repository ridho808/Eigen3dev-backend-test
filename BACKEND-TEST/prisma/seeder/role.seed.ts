import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export const role = async () => {
    try {
        const data = [
            {
                name: "admin",
            },
            {
                name: "member",
            }
        ]
        await prisma.role.createMany({
            data: data,
        })
        console.log("Roles created successfully");
    } catch (error) {
        console.log(error);
    }
}