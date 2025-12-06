const dotenv = require("dotenv");
dotenv.config();
process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../server");
const mockingoose = require("mockingoose");

//MODELS
const Game = require("../models/Game");
const Genre = require("../models/Genre");
const Platform = require("../models/Platform");
const Studio = require("../models/Studio");

const gameId = "674000000000000000000032";
const genreId = "674000000000000000000001";
const platformId = "674000000000000000000011";
const studioId = "674000000000000000000022";

//before all test

beforeEach(() => {
  mockingoose.resetAll(); //reset before each test
});

//GAMES

describe("Games GET endpoints", () => {
  test("GET /games should return 200 and an array", async () => {
    const mockGames = [
      {
        _id: gameId,
        title: "Game test",
        description: "Game description",
        releaseYear: 2024,
        genre: [],
        platforms: [],
        studio: studioId,
        multiplayer: false,
        language: "English",
      },
    ];

    //Game.find(), configuration

    mockingoose(Game).toReturn(mockGames, "find");
    // request to GET. game route. getAll
    const res = await request(app).get("/games");

    expect(res.status).toBe(200);

    expect(Array.isArray(res.body)).toBe(true);

    expect(res.body[0]).toHaveProperty("title", "Game test");
  });

  //Second test
  test("GET /games/:id should return 200 when id exists", async () => {
    const mockGame = {
      _id: gameId,
      title: "Game test",
      description: "Game description",
      releaseYear: 2024,
      genre: [],
      platforms: [],
      studio: studioId,
      multiplayer: false,
      language: "English",
    };

    // findById ->'findOne'
    mockingoose(Game).toReturn(mockGame, "findOne");

    const res = await request(app).get(`/games/${gameId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id", gameId);
    expect(res.body).toHaveProperty("title", "Game test");
  });

  test("GET /games/:id should return 400 for invalid id", async () => {
    const res = await request(app).get("/games/12345");

    expect(res.status).toBe(400);

    expect(res.body).toHaveProperty(
      "message",
      "Bad Request - validation failed"
    );
  });

  test("GET /games/:id should return 404 for valid but non-existing id", async () => {
    const validButMissingId = "507f1f77bcf86cd799439099";

    // findOne -> null
    mockingoose(Game).toReturn(null, "findOne");

    const res = await request(app).get(`/games/${validButMissingId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Item not found in games");
  });
});

//  GENRES

describe("GENRES GET endpoints", () => {
  test("GET /genres should return 200 and an array", async () => {
    const mockGenres = [
      {
        _id: genreId,
        name: "Genre test",
        description: "Genre games",
      },
    ];

    mockingoose(Genre).toReturn(mockGenres, "find");

    const res = await request(app).get("/genres");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("name", "Genre test");
  });

  test("GET /genres/:id should return 200 when id exists", async () => {
    const mockGenre = {
      _id: genreId,
      name: "Genre test",
      description: "Genre games",
    };

    mockingoose(Genre).toReturn(mockGenre, "findOne");

    const res = await request(app).get(`/genres/${genreId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id", genreId);
    expect(res.body).toHaveProperty("name", "Genre test");
  });

  test("GET /genres/:id should return 400 for invalid id", async () => {
    const res = await request(app).get("/genres/12345");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      "Bad Request - validation failed"
    );
  });

  test("GET /genres/:id should return 404 for valid but non-existing id", async () => {
    const validButMissingId = "507f1f77bcf86cd799439098";

    mockingoose(Genre).toReturn(null, "findOne");

    const res = await request(app).get(`/genres/${validButMissingId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Item not found in genres");
  });
});

// PLATFORM

describe("PLATFORMS GET endpoints (mockingoose)", () => {
  test("GET /platforms should return 200 and an array", async () => {
    const mockPlatforms = [
      {
        _id: platformId,
        name: "Platform test",
        manufacturer: "Generic",
      },
    ];

    mockingoose(Platform).toReturn(mockPlatforms, "find");

    const res = await request(app).get("/platforms");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("name", "Platform test");
  });

  test("GET /platforms/:id should return 200 when id exists", async () => {
    const mockPlatform = {
      _id: platformId,
      name: "Platform test",
      manufacturer: "Generic",
    };

    mockingoose(Platform).toReturn(mockPlatform, "findOne");

    const res = await request(app).get(`/platforms/${platformId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id", platformId);
    expect(res.body).toHaveProperty("name", "Platform test");
  });

  test("GET /platforms/:id should return 400 for invalid id", async () => {
    const res = await request(app).get("/platforms/12345");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      "Bad Request - validation failed"
    );
  });

  test("GET /platforms/:id should return 404 for valid but non-existing id", async () => {
    const validButMissingId = "507f1f77bcf86cd799439097";

    mockingoose(Platform).toReturn(null, "findOne");

    const res = await request(app).get(`/platforms/${validButMissingId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Item not found in platforms");
  });
});

// STUDIOS

describe("STUDIOS GET endpoints (mockingoose)", () => {
  test("GET /studios should return 200 and an array", async () => {
    const mockStudios = [
      {
        _id: studioId,
        name: "Studio test",
        country: "USA",
      },
    ];

    mockingoose(Studio).toReturn(mockStudios, "find");

    const res = await request(app).get("/studios");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("name", "Studio test");
  });

  test("GET /studios/:id should return 200 when id exists", async () => {
    const mockStudio = {
      _id: studioId,
      name: "Studio test",
      country: "USA",
    };

    mockingoose(Studio).toReturn(mockStudio, "findOne");

    const res = await request(app).get(`/studios/${studioId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id", studioId);
    expect(res.body).toHaveProperty("name", "Studio test");
  });

  test("GET /studios/:id should return 400 for invalid id", async () => {
    const res = await request(app).get("/studios/12345");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      "Bad Request - validation failed"
    );
  });

  test("GET /studios/:id should return 404 for valid but non-existing id", async () => {
    const validButMissingId = "507f1f77bcf86cd799439096";

    mockingoose(Studio).toReturn(null, "findOne");

    const res = await request(app).get(`/studios/${validButMissingId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Item not found in studios");
  });
});
