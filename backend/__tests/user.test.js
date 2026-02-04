import express from "express";
import request from "supertest";
import userRouter from "../routes/usersRoute.js";
import authRouter from "../routes/authRoute.js";
import app from "../app.js";

//const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", userRouter);

const userEmail = "testuser@example.com";
const userPassword = "testpassword";

describe("Authentication API Endpoints", () => {
  it("POST /login - should authenticate user", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: userEmail, password: userPassword });
    expect(res.statusCode).toEqual(200);
  });
  it("POST /logout - should log out user", async () => {
    const res = await request(app)
      .post("/api/logout")
      .send({ email: userEmail, password: userPassword });
    expect(res.statusCode).toEqual(200);
  });
});
describe("User API Endpoints", () => {
  it("GET /api/users - should return all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
