import supertest from "supertest"
import app from "../../src/app"

describe('======AUTHENTICATION======', () => {
    const MemberPayload = {
        name: "LUCY 2",
        password: "123453"
    }
    describe('TEST API FOR AUTHENTICATION 🤵🏼', () => {
        describe("SIGN-UP API", () => {
            it('should return STATUS CODE 201 Or 400', async () => {
                try {
                    const response = await supertest(app)
                        .post('/auth/signup')
                        .send(MemberPayload)
                        .expect(201)
                    expect(response.body).toHaveProperty("tokens")
                    expect(response.header["Set-Cookie"]).toBeDefined()
                } catch (error) {
                    await supertest(app)
                        .post('/auth/signup')
                        .send(MemberPayload)
                        .expect(400)
                }
            })
        })
        describe("SIGN-IN API", () => {
            it('should return STATUS CODE 200', async () => {
                try {
                    let response = await supertest(app)
                        .post('/auth/signin')
                        .send({ name: MemberPayload.name, password: MemberPayload.password })
                        .expect(200)

                } catch (error) {
                    await supertest(app)
                        .post('/auth/signin')
                        .send({ name: MemberPayload.name, password: "wrong_password" })
                        .expect(400)
                }
            })
        })
        describe("SIGN-OUT", () => {
            it("should return STATUS CODE 200", async () => {
                const response = await supertest(app)
                    .delete('/auth/signout')
                    .expect(200)
            })
        })
    })
})