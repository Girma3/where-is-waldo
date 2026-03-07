const apiUrl = import.meta.env.VITE_API_URL;

async function fetchUsersApi() {
  const res = await fetch(`${apiUrl}/api/users`);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
}

async function fetchUserByIdApi(id) {
  const res = await fetch(`${apiUrl}/api/users/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user by id");
  }
  return res.json();
}
async function removeUserByEmail(email) {
  const res = await fetch(`${apiUrl}/api/users/deleteByEmail/${email}`);
  if (!res.ok) {
    throw new Error("Failed to remove user by email");
  }
  return res.json();
}

export { fetchUsersApi, fetchUserByIdApi, removeUserByEmail };
