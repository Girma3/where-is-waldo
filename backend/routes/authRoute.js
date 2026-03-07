import express from "express";
import {
  handleLoginRequest,
  handleSignUp,
  handleLogout,
  ValidateLogin,
  ValidateSignUp,
} from "../controllers/authController.js";

const authRouter = express.Router();
authRouter.post("/signup", ValidateSignUp, handleSignUp);
authRouter.post("/login", ValidateLogin, handleLoginRequest);

authRouter.post("/logout", handleLogout);

export default authRouter;
