import express from "express";
import request from "supertest";
import app from "../app.js";
import gameRouter from "../routes/gameRoute.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", gameRouter);

describe("Game start api", () => {
  const agent = request.agent(app);

  beforeAll(async () => {
    await agent.post("/api/signup").send({
      email: "test@test.com",
      password: "password123",
    });

    await agent.post("/api/login").send({
      email: "test@test.com",
      password: "password123",
    });

    await agent.post("/api/start").send();
  });

  it("create new game in db", async () => {
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("level");
    expect(response.body).toHaveProperty("image");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("status", "IN_PROGRESS");
    expect(response.body).toHaveProperty("userId");
  });
});
