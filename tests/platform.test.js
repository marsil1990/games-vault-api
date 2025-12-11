const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const Platform = require("../models/Platform");

describe("Platform API Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGODB_URL_TEST || process.env.MONGODB_URL
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("GET /platforms", () => {
    it("should return all platforms with 200 status", async () => {
      const res = await request(app).get("/platforms");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe("GET /platforms/:id", () => {
    let testPlatformId;

    beforeAll(async () => {
      // Create a test platform
      const platform = await Platform.create({
        name: "Test Platform for GET",
        manufacturer: "Test Manufacturer",
        releaseYear: 2020,
        type: "Console",
        country: "USA",
        foundedYear: 2000,
        website: "https://test-platform.com",
      });
      testPlatformId = platform._id.toString();
    });

    afterAll(async () => {
      // Cleanup test platform
      if (testPlatformId) {
        await Platform.findByIdAndDelete(testPlatformId);
      }
    });

    it("should return a single platform with 200 status", async () => {
      const res = await request(app).get(`/platforms/${testPlatformId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name", "Test Platform for GET");
      expect(res.body).toHaveProperty("_id");
    });

    it("should return 404 for non-existent platform", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/platforms/${fakeId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });

    it("should return 400 for invalid ID format", async () => {
      const res = await request(app).get("/platforms/invalid-id-format");
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });
  });
});
