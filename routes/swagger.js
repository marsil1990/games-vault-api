const router = require("express").Router();
const swaggerUI = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

// Load the static swagger.json once
const swaggerPath = path.join(__dirname, "..", "swagger.json");
let swaggerDocumentation = {};
try {
	swaggerDocumentation = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));
} catch (err) {
	console.error("Failed to load swagger.json:", err);
}

// Determine host and scheme based on environment or env var
const prodHost = process.env.SWAGGER_HOST || "games-vault-api-x81d.onrender.com";
const prodSchemes = ["https"];
const devHost = process.env.SWAGGER_HOST || "localhost:3000";
const devSchemes = ["http"];

const isProd = process.env.NODE_ENV === "production";

// Make a copy and set host/schemes dynamically so the same repo works local and on Render
const swaggerDocForUI = JSON.parse(JSON.stringify(swaggerDocumentation || {}));
if (swaggerDocForUI) {
	swaggerDocForUI.host = isProd ? prodHost : devHost;
	swaggerDocForUI.schemes = isProd ? prodSchemes : devSchemes;
}

// Serve Swagger UI and enable withCredentials so the UI will send cookies
router.use(
	"/api-docs",
	swaggerUI.serve,
	swaggerUI.setup(swaggerDocForUI, {
		swaggerOptions: { withCredentials: true }
	})
);

module.exports = router;
