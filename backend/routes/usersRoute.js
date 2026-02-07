import express from "express";
import {
  fetchUsers,
  addUser,
  removeUserById,
  removeUserByEmail,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/signup", addUser);
userRouter.get("/users", fetchUsers);
userRouter.delete("/users/:id", removeUserById);
userRouter.delete("/users/deleteByEmail/:email", removeUserByEmail);

export default userRouter;
