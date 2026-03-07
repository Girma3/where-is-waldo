import request from "supertest";
import app from "../app.js";

const userEmail = "test@example.com";
const userPassword = "king";
const newUserName = "test user";

describe("Authentication API Endpoints", () => {
  let createdUserId;
  let agent = request.agent(app); // persist cookies across requests

  it("POST /login - should authenticate user", async () => {
    const res = await agent
      .post("/api/login")
      .send({ email: userEmail, password: userPassword });
    expect(res.statusCode).toEqual(200);
  });
  // it("GET /api/me - should return current user", async () => {
  //   const res = await agent.get("/api/me");

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.user.email).toBe(userEmail);
  // });
});
// it("remove in case user exists", async () => {
//   await agent.delete(`/api/users/deleteByEmail/${userEmail}`);
// });
// it("POST /signup - should create a new user", async () => {
//   const res = await agent
//     .post("/api/signup")
//     .send({ email: userEmail, name: newUserName, password: userPassword });
//   expect(res.statusCode).toEqual(201);
//   createdUserId = res.body.id; // capture ID for later delete
// });  //   it("is user authenticated", async () => {
//     const res = await agent.get("/api/protected").send();
//     expect(res.statusCode).toBe(200);
//   });
// it("remove created user", async () => {
//   const res = await agent.delete(`/api/users/deleteByEmail/${userEmail}`);
//   expect(res.statusCode).toEqual(200);
// });
