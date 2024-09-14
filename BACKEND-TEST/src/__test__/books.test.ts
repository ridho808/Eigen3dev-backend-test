import supertest from "supertest"
import app from "../../src/app"


describe("books", () => {
    describe("TEST API FOR BOOKS 📗", () => {
        describe("GET ALL BOOKS", () => {
            it("should return all books", async () => {
                await supertest(app)
                    .get("/books")
                    .expect(200)
            })
        })
        describe("GET ONE BOOKS BY ID", () => {
            it("should return the book", async () => {
                await supertest(app)
                    .get("/books/1")
                    .expect(200)
            })
            it("should return 404 when the book does not exist", async () => {
                await supertest(app)
                    .get("/books/1000")
                    .expect(404)
            })
        })
        describe('GET AVAILABLE BOOKS', () => {
            it('should return all available books', async () => {
                await supertest(app)
                    .get('/books/available')
                    .expect(200)
            })
        })
        describe('GET UNAVAILABEL BOOKS', () => {
            it('should return all available books', async () => {
                await supertest(app)
                    .get('/books/unavailable')
                    .expect(200)
            })
        })
        describe('GET ALL BOOKS BY AUTHOR', () => {
            it('should return all books by author', async () => {
                await supertest(app)
                    .get('/books/author?name=J.K Rowling')
                    .expect(200)
            })
            it('should return 404 when the author does not exist', async () => {
                await supertest(app)
                    .get('/books/author?name=adsw')
                    .expect(404)
            })
        })
    })
})