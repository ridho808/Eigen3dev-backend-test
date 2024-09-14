import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export const books = async () => {
    try {
        const data = [
            {
                code: "JK-45",
                title: "Harry Potter",
                author: "J.K Rowling",
            },
            {
                code: "SHR-1",
                title: "A Study in Scarlet",
                author: "Arthur Conan Doyle",
            },
            {
                code: "TW-11",
                title: "Twilight",
                author: "Stephenie Meyer",
            },
            {
                code: "HOB-83",
                title: "The Hobbit, or There and Back Again",
                author: "J.R.R. Tolkien",
            },
            {
                code: "NRN-7",
                title: "The Lion, the Witch and the Wardrobe",
                author: "C.S. Lewis",
            },
        ]
        await prisma.book.createMany({
            data: data,
        })
        console.log("Seed:Book successfully");
    } catch (error) {
        console.log(error);
    }
}
