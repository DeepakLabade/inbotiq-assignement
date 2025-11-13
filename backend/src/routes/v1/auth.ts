import { Router } from "express";
import register from "../../controllers/v1/auth/register";
import login from "../../controllers/v1/auth/login";
import getMe from "../../controllers/v1/auth/getme";
import logout from "../../controllers/v1/auth/logout";

const AuthRouter = Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", logout)

export default AuthRouter;
