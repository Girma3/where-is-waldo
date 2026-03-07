const apiUrl = import.meta.env.VITE_API_URL;

async function signUpUser({ name, email }) {
  const response = await fetch(`${apiUrl}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to sign up user");
  }

  return response.json();
}
async function loginUserApi({ email }) {
  const password = "1234";
  const res = await fetch(`${apiUrl}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to login user");
  }
  return res.json();
}

async function logoutUserApi() {
  const res = await fetch(`${apiUrl}/api/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to logout user");
  }
  return res.json();
}
export { signUpUser, loginUserApi, logoutUserApi };
