import express from "express";
import {
  fetchUsers,
  addUser,
  logInUser,
  logOutUser,
  fetchUserById,
  removeUserById,
  removeUserByEmail,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/signup", addUser);
userRouter.post("/login", logInUser);
userRouter.post("/logout", logOutUser);

userRouter.get("/users", fetchUsers);
userRouter.get("/users/:id", fetchUserById);
userRouter.delete("/users/:id", removeUserById);
userRouter.delete("/users/deleteByEmail/:email", removeUserByEmail);

export default userRouter;
