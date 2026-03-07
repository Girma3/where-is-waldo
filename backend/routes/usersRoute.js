import express from "express";
import {
  fetchUsers,
  fetchUserById,
  removeUserById,
  removeUserByEmail,
  getCurrentUser,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/currentUser", getCurrentUser);
userRouter.get("/users", fetchUsers);
userRouter.get("/users/:id", fetchUserById);
userRouter.delete("/users/:id", removeUserById);
userRouter.delete("/users/deleteByEmail/:email", removeUserByEmail);

export default userRouter;
