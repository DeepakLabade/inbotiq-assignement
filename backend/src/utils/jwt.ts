import jwt from "jsonwebtoken";
import config from "../config/app.config";

export const generateToken = async (userId: String) => {
    try {
      const token = await jwt.sign(
        {
          userId,
        },
        config.JWT_SECRET!
      );
        return token;
  } catch (error) {
    console.log("cannot create a access token");
    new Error("cannot create a access token");
  }
};
