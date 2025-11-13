import { Request, Response } from "express";

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    res.json({
      msg: "logout successfully",
    });
  } catch (error) {
    console.log("error while logging out");
    new Error("error while logging out");
  }
};

export default logout;
