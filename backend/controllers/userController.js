import {
  getUsers,
  deleteUserById,
  deleteUserByEmail,
  getUserById,
} from "../db/userQueries.js";

async function fetchUsers(req, res) {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch users" });
  }
}
async function fetchUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserById(Number(id));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch user by id" });
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
  if (!email) {
    return res.status(400).json({ error: "User email is required" });
  }
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
async function getCurrentUser(req, res, next) {
  const user = req.user;
  if (!user)
    return res.status(401).json({ error: "No user session found try log in" });

  try {
    console.log(user);
    return res.status(200).json({ message: "Logged in", user });
  } catch (error) {
    return next(error);
  }
}

export {
  fetchUsers,
  fetchUserById,
  removeUserById,
  removeUserByEmail,
  getCurrentUser,
};
