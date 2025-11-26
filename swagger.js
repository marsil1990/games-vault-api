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
    title: "API - Contacts ",
    description:
      "This API allow us to get, create, update and delete Games, genrer, plataform and others",
  },
  host: host,
  schemes: ["http", "https"],
  securityDefinitions: {
    cookieAuth: {
      type: "apiKey",
      in: "cookie",
      name: "connect.sid",
      description:
        "Session cookie set after login in via /login (Google OAuth).",
    },
  },
};

swaggerAutogen()(outputFile, endPointsFiles, doc);
