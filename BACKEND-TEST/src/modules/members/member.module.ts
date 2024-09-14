import MemberController from "@member/controller"
import { Router } from "express"

const router = Router()

router.get("/penalties", MemberController.getMemberPenalties)
router.get("/", MemberController.getAllMembers)
router.get("/:id", MemberController.getMemberById)


export default (app: Router) => {
    app.use("/members", router)
}