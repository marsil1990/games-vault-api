const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const Game = require("../models/Game");

describe("Game API Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGODB_URL_TEST || process.env.MONGODB_URL
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("GET /games", () => {
    it("should return all games with 200 status", async () => {
      const res = await request(app).get("/games");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe("GET /games/:id", () => {
    let testGameId;

    beforeAll(async () => {
      // Create a test game
      const game = await Game.create({
        title: "Test Game for GET",
        releaseYear: 2024,
        multiplayer: false,
        description: "A test game",
      });
      testGameId = game._id.toString();
    });

    afterAll(async () => {
      // Cleanup test game
      if (testGameId) {
        await Game.findByIdAndDelete(testGameId);
      }
    });

    it("should return a single game with 200 status", async () => {
      const res = await request(app).get(`/games/${testGameId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("title", "Test Game for GET");
      expect(res.body).toHaveProperty("_id");
    });

    it("should return 404 for non-existent game", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/games/${fakeId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });

    it("should return 400 for invalid ID format", async () => {
      const res = await request(app).get("/games/invalid-id-format");
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });
  });
});
