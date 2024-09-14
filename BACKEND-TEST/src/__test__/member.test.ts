import supertest from "supertest"
import app from "../../src/app"


describe('Members', () => {
    describe('TEST API FOR MEMBERS 🤵🏼', () => {
        describe("GET ALL MEMBERS SUCCESS", () => {
            it('should return all members', async () => {
                const response = await supertest(app).get('/members').expect(200)
                expect(response.body)
            })
        })
        describe("GET MEMBER BY ID SUCCESS", () => {
            it('should return member by id', async () => {
                const response = await supertest(app).get('/members/2').expect(200)
                expect(response.body)
            })
        })
        describe("GET ERROR MEMBER NOT EXIST", () => {
            it('should return error for Not exist member', async () => {
                const response = await supertest(app).get('/members/100').expect(404)
                expect(response.body)
            })
        })
        describe("GET MEMBER HAVE PINALTIES", () => {
            it('should return member have pinalties', async () => {
                await supertest(app).get('/members/pinalties').expect(200)
            })
        })

    })
})