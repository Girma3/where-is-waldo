import prismaGlobal from "./pool.js";

//function to create user
async function createUser(email, name) {
  try {
    const createdUser = await prismaGlobal.user.create({
      data: {
        email: email,
        name: name,
      },
    });
    return createdUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

//functions to read users from data base
async function getUsers() {
  try {
    const users = await prismaGlobal.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
async function getUserById(id) {
  try {
    const user = await prismaGlobal.user.findUnique({
      where: { id: id },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

async function getUserByEmail(email) {
  if (!email) {
    throw new Error("Email is required to find user");
  }
  try {
    const user = await prismaGlobal.user.findUnique({
      where: { email: email },
    });
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
}
//to remove user from db
async function deleteUserById(id) {
  if (!id) {
    throw new Error("User ID is required for deletion");
  }
  try {
    const user = await prismaGlobal.user.delete({
      where: { id: id },
    });
    return user;
  } catch (error) {
    console.error("Error deleting user by id:", error);
    throw error;
  }
}
async function deleteUserByEmail(email) {
  if (!email) {
    throw new Error("User email is required for deletion");
  }
  try {
    const user = await prismaGlobal.user.delete({
      where: { email: email },
    });
    return user;
  } catch (error) {
    console.error("Error deleting user by email:", error);
    throw error;
  }
}

export {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  deleteUserById,
  deleteUserByEmail,
};
