import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();

const outputFile = "swagger.json";
const endPointsFiles = ["./routes/index.js"];

// Determina o host baseado no ambiente
const host = process.env.NODE_ENV === "production" 
  ? "games-vault-api-x81d.onrender.com" 
  : "localhost:3000";

const doc = {
  info: {
    title: "API - Games Vault ",
    description:
      "This API allow us to get, create, update and delete Games, genrer, plataform and others",
  },
  host: host,
  schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"],
  securityDefinitions: {
    cookieAuth: {
      type: "apiKey",
      in: "cookie",
      name: "connect.sid",
      description:
        "Session cookie set after login in via /login (Google OAuth).",
    },
  },

  definitions: {
    Genre: {
      name: "Action",
      description: "Fast-paced games...",
    },
    Studio: {
      name: "Nintendo",
      foundedYear: 1980,
      country: "Japan",
      website: "https://nintendo.com",
      description: "Famous studio...",
    },
    Platform: {
      name: "PlayStation 5",
      manufacturer: "Sony",
      releaseYear: 2020,
      type: "Console",
      country: "Japan",
      foundedYear: 1946,
      website: "https://sony.com",
    },
    Game: {
      title: "Super Mario",
      description: "Platform game",
      releaseYear: 1990,
      genre: ["Platform"],
      platforms: ["Nintendo"],
      studio: "Nintendo",
      multiplayer: false,
      language: "English",
    },
  },
};

swaggerAutogen()(outputFile, endPointsFiles, doc);
