import {
  createUser,
  getUsers,
  deleteUserById,
  deleteUserByEmail,
} from "../db/userQueries.js";
import dotenv from "dotenv";
dotenv.config();

async function addUser(req, res) {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Email and name are required" });
  }

  try {
    const newUser = await createUser(email, name);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create user" });
  }
}

async function fetchUsers(req, res) {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch users" });
  }
}

async function removeUserById(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const deletedUser = await deleteUserById(Number(id));
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(deletedUser);
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete user" });
  }
}

async function removeUserByEmail(req, res) {
  const { email } = req.params;
  try {
    const userToDelete = await deleteUserByEmail(email);
    if (!userToDelete) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(userToDelete);
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete user" });
  }
}

export { addUser, fetchUsers, removeUserById, removeUserByEmail };
