const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const Genre = require("../models/Genre");

describe("Genre API Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGODB_URL_TEST || process.env.MONGODB_URL
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("GET /genres", () => {
    it("should return all genres with 200 status", async () => {
      const res = await request(app).get("/genres");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe("GET /genres/:id", () => {
    let testGenreId;

    beforeAll(async () => {
      // Create a test genre
      const genre = await Genre.create({
        name: "Test Genre for GET",
        description: "A test genre",
      });
      testGenreId = genre._id.toString();
    });

    afterAll(async () => {
      // Cleanup test genre
      if (testGenreId) {
        await Genre.findByIdAndDelete(testGenreId);
      }
    });

    it("should return a single genre with 200 status", async () => {
      const res = await request(app).get(`/genres/${testGenreId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name", "Test Genre for GET");
      expect(res.body).toHaveProperty("_id");
    });

    it("should return 404 for non-existent genre", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/genres/${fakeId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });

    it("should return 400 for invalid ID format", async () => {
      const res = await request(app).get("/genres/invalid-id-format");
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });
  });
});
