import express from "express";
import request from "supertest";
import app from "../app.js";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

describe("Game start api", () => {
  const agent = request.agent(app);

  beforeAll(async () => {
    // await agent.delete(`/api/users/deleteByEmail/`);
    // await agent.post("/api/signup").send({
    //   email: "test@testl.com",
    //   name: "Test User",
    //   password: "password123",
    // });

    await agent.post("/api/login").send({
      email: "test@testl.com",
      name: "Test User",
      password: "password123",
    });
  });

  it("create new game in db or return existing game", async () => {
    const response = await agent.post("/api/game").send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("level");
    expect(response.body).toHaveProperty("image");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("status", "IN_PROGRESS");
    expect(response.body).toHaveProperty("userId");
  });
  it("character finding endpoint", async () => {
    const characterId = 1; // Assuming character with ID 1 exists in the database
    const gameId = 5;
    const response = await agent
      .post(`/api/game/${gameId}/character/${characterId}`)
      .send({ characterId, x: 100, y: 150 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("isCorrect", true);
  });
  it("character not found endpoint", async () => {
    // Implement test for character not found scenario
    const characterId = 1; // Assuming character with ID 1 exists in the database
    const gameId = 5;
    const response = await agent
      .post(`/api/game/${gameId}/character/${characterId}`)
      .send({ characterId, x: 101, y: 151 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("isCorrect", false);
  });
  it("is game end and all character found", async () => {
    const characterId = 1; // assuming character with ID 1 exists in the database
    const gameId = 5;

    const response = await agent
      .post(`/api/game/${gameId}/character/${characterId}`)
      .send({ characterId, x: 100, y: 150 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("isCorrect", true);
    expect(response.body).toHaveProperty("isGameEnded", true);
    expect(response.body).toHaveProperty("game");
  });
  /*
  it("delete game endpoint", async () => {
    // First, create a new game to get its id
    const createResponse = await agent.post("/api/game").send();
    expect(createResponse.statusCode).toBe(200);
    const { id } = createResponse.body;
    expect(id).toBeDefined();

    // Now, delete the created game
    const response = await agent.delete(`/api/game/delete/${id}`).send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Game deleted");
  });
  */
});
