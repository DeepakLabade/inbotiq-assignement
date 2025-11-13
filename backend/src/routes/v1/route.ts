import { Router } from "express";
import AuthRouter from "./auth";
import userRouter from "./user";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/user", userRouter)

router.use("/", (req, res) => {
  res.status(200).json({
    msg: "server is running",
    status: "ok",
  });
});

export default router;
