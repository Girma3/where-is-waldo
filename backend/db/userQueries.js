import prismaGlobal from "./pool.js";

//function to create user
async function createUser(user) {
  try {
    const createdUser = await prismaGlobal.user.create({
      data: user,
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

export { createUser, getUsers, getUserById, getUserByEmail };
