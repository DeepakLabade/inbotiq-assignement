import { Router } from "express";
import { auth } from "../../middleware/auth";
import getMe from "../../controllers/v1/auth/getme";

const userRouter = Router()

userRouter.get("/me", auth, getMe)

export default userRouter