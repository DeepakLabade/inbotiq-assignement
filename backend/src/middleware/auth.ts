import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/app.config";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            msg: "no token found",
            status: "unauthorised"
        })
    }

    try {
        const decodedData = jwt.verify(token, config.JWT_SECRET!)
        console.log(decodedData)
        req.user = decodedData
        next();
    } catch (error) {
        console.log("authrization error")
        return res.status(403).json({
        msg: "Invalid or expired token",
        status: "forbidden",
    });
    }
}