import { Request, Response } from "express";
import z from "zod";
import bcrypt from "bcrypt";
import prisma from "../../../utils/db";
import { generateToken } from "../../../utils/jwt";

const login = async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      email: z.string().email().max(30),
      password: z.string().min(6).max(30),
    });

    const parsedData = schema.safeParse(req.body);

    if (!parsedData.success) {
      res.status(400).json({
        msg: "Invalid input format",
        error: parsedData.error,
      });
      return;
    }

    const { email, password } = parsedData.data;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      res.status(404).json({
        msg: "User not found",
        status: "bad",
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({
        msg: "Invalid Credentials",
        status: "bad",
      });
      return;
    }

    const token = await generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      token,
      role: user.role,
      msg: "Login successful",
      status: "ok",
    });
  } catch (error) {
    console.log("Login failed:", error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export default login;
