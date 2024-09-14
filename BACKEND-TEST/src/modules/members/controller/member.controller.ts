import { AsyncHandler } from "@utils";
import { Request, Response } from "express";
import MemberService from "../services/member.service";


export default class MemberController extends AsyncHandler {
    constructor() {
        super()
    }

    static getAllMembers = this.handleRequest(async (req: Request, res: Response) => {
        const member = await MemberService.getAllMembers()
        return {
            status: 200,
            message: "All members retrieved successfully",
            members: member
        }
    })

    static getMemberById = this.handleRequest(async (req: Request, res: Response) => {
        const id = req.params.id
        const member = await MemberService.getMemberById(+id)
        return {
            status: 200,
            message: "Get Member successfully",
            members: member
        }
    })

    static getMemberPenalties = this.handleRequest(async (req: Request, res: Response) => {
        const member = await MemberService.MemberPenalties()
        return {
            status: 200,
            message: "Get Member Penalties successfully",
            members: member
        }
    })
}