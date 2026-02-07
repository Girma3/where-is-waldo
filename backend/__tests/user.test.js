import express from "express";
import request from "supertest";
import app from "../app.js";
import userRouter from "../routes/usersRoute.js";
import authRouter from "../routes/authRoute.js";
import isUserAuth from "../authentication/isUserAuth.js";

//const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", userRouter);

const userEmail = "testnew@example.com";
const userPassword = "testpassword";
const newUserName = "New User";

describe("Authentication API Endpoints", () => {
  let createdUserId;
  let agent = request.agent(app); // persist cookies across requests
  it("remove in case user exists", async () => {
    await agent.delete(`/api/users/deleteByEmail/${userEmail}`);
  });

  it("POST /signup - should create a new user", async () => {
    const res = await agent
      .post("/api/signup")
      .send({ email: userEmail, name: newUserName, password: userPassword });
    expect(res.statusCode).toEqual(201);
    createdUserId = res.body.id; // capture ID for later delete
  });

  it("POST /login - should authenticate user", async () => {
    const res = await agent
      .post("/api/login")
      .send({ email: userEmail, password: userPassword });
    expect(res.statusCode).toEqual(200);
  });

  it("GET /api/users - should return all users (authenticated)", async () => {
    const res = await agent.get("/api/users"); // cookie persisted
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("DELETE /api/users/:id - should delete the created user", async () => {
    const res = await agent.delete(`/api/users/${createdUserId}`);
    expect(res.statusCode).toEqual(200);
  });
});
