import { Router } from "express"
import adminController from "@admin/controller"
import { CreateMemberAuth as AuthAdmin, JwtMiddleware } from "@middleware/validator"

const router = Router()

router.post("/signup", AuthAdmin, adminController.Signup)
router.post("/signin", AuthAdmin, adminController.Signin)
router.delete("/signout", adminController.Signout)
router.get("/refresh", JwtMiddleware.VerifyAdminRefresh, adminController.RefreshToken)

export default (app: Router) => {
    app.use("/admin", router)
}