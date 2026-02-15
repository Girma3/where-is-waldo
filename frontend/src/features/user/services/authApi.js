//authentication for user
//  "sign up new user": "api/user/signup",
//   login: "api/user/login",
//   logout: "api/user/logout",

async function signUpUser({ name: userName, email: userEmail }) {
  const response = await fetch(`http://localhost:4000/api/user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, userEmail }),
  });

  if (!response.ok) {
    throw new Error("Failed to sign up user");
  }

  return response.json();
}
async function loginUserApi({ name, email }) {
  const res = await fetch(`http://localhost:4000/api/user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  if (!res.ok) {
    throw new Error("Failed to login user");
  }
  return res.json();
}

async function logoutUserApi() {
  const res = await fetch("http://localhost:4000/api/user/logout");
  if (!res.ok) {
    throw new Error("Failed to logout user");
  }
  return res.json();
}
export { signUpUser, loginUserApi, logoutUserApi };
