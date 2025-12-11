const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const Studio = require("../models/Studio");

describe("Studio API Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGODB_URL_TEST || process.env.MONGODB_URL
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("GET /studios", () => {
    it("should return all studios with 200 status", async () => {
      const res = await request(app).get("/studios");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe("GET /studios/:id", () => {
    let testStudioId;

    beforeAll(async () => {
      // Create a test studio
      const studio = await Studio.create({
        name: "Test Studio for GET",
        foundedYear: 2000,
        country: "USA",
        description: "A test studio",
      });
      testStudioId = studio._id.toString();
    });

    afterAll(async () => {
      // Cleanup test studio
      if (testStudioId) {
        await Studio.findByIdAndDelete(testStudioId);
      }
    });

    it("should return a single studio with 200 status", async () => {
      const res = await request(app).get(`/studios/${testStudioId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name", "Test Studio for GET");
      expect(res.body).toHaveProperty("_id");
    });

    it("should return 404 for non-existent studio", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/studios/${fakeId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });

    it("should return 400 for invalid ID format", async () => {
      const res = await request(app).get("/studios/invalid-id-format");
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });
  });
});
