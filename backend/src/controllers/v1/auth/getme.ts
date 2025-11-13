import { Request, Response } from "express"
import prisma from "../../../utils/db";

const getMe = async (req: Request, res: Response) => {
    try {
        const userId = req.user.userId;
        

      if (!userId) {
        return res.status(400).json({
          msg: "invalid token payload",
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
        },
      });
      if (!user) {
        return res.status(404).json({
          msg: "User not found",
        });
      }

      return res.status(200).json({
        msg: "User fetched successfully",
        user,
      });
    } catch (error) {
      console.log("GetMe Error:", error);
      return res.status(500).json({
        msg: "Internal server error",
      });
    }
}

export default getMe