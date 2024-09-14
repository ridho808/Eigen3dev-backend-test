import AuthenticateController from "@auth/controller";
import { CreateMemberAuth, JwtMiddleware } from "@middleware/validator";
import { Router } from "express";

const router = Router()

// AUTHENTICATION
router.post("/signup", CreateMemberAuth, AuthenticateController.Signup)
router.post("/signin", CreateMemberAuth, AuthenticateController.Signin)
router.delete("/signout", AuthenticateController.Signout)
router.get("/refresh", JwtMiddleware.VerifyRefreshToken, AuthenticateController.RefreshToken)

// 

export default (app: Router) => {
    app.use("/auth", router)
}



