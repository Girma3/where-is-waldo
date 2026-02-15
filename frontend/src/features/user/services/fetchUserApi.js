// "get all users": "api/users",
//   "remove single user by id": "api/users/:id",
//   "remove single user by email": "api/users/deleteByEmail/:email",

async function fetchUsersApi() {
  const res = await fetch("http://localhost:4000/api/users");
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
}

async function fetchUserByIdApi(id) {
  const res = await fetch(`http://localhost:4000/api/users/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user by id");
  }
  return res.json();
}
async function removeUserByEmail(email) {
  const res = await fetch(
    `http://localhost:4000/api/users/deleteByEmail/${email}`,
  );
  if (!res.ok) {
    throw new Error("Failed to remove user by email");
  }
  return res.json();
}

export { fetchUsersApi, fetchUserByIdApi, removeUserByEmail };
