import { Request, Response } from "express";
import z, { string } from "zod";
import bcrypt from "bcrypt";
import prisma from "../../../utils/db";
import { genusername } from "../../../utils/index";
import { generateToken } from "../../../utils/jwt";

const register = async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      email: z.string().email().max(30),
      role: z.enum(["admin", "user"]),
      password: z.string().min(6).max(30),
    });

    const parsedData = schema.safeParse(req.body);

    if (!parsedData.success) {
      console.log(parsedData.error);
      res.status(400).json({
        msg: "data format is incorrect",
      });
      return;
    }

    const { email, password, role } = parsedData.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      res.status(400).json({
        msg: "user already exist",
        status: "bad",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 13);
    const username = genusername();

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
      },
    });

    const token = await generateToken(newUser.id);
    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      token: token,
      msg: "user registered successfully",
      status: "ok",
    });
  } catch (error) {
    console.log("registration failed: ", error);
    Error("registration failed: " + error);
  }
};

export default register;
