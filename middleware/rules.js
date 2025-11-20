const { checkSchema, param } = require("express-validator");

// game
const saveGameRules = checkSchema({
  title: {
    in: ["body"],
    notEmpty: { errorMessage: "title is required" },
  },
  releaseYear: {
    in: ["body"],
    optional: true,
    isInt: {
      options: { min: 1950 },
      errorMessage: "releaseYear must be a valid year",
    },
  },
  multiplayer: {
    in: ["body"],
    optional: true,
    isBoolean: { errorMessage: "multiplayer must be boolean" },
  },
  genre: {
    in: ["body"],
    optional: true,
    isArray: { errorMessage: "genre must be an array of ids" },
  },
  "genre.*": {
    in: ["body"],
    optional: true,
    isMongoId: { errorMessage: "each genre id must be a valid MongoId" },
  },
  platforms: {
    in: ["body"],
    optional: true,
    isArray: { errorMessage: "platforms must be an array of ids" },
  },
  "platforms.*": {
    in: ["body"],
    optional: true,
    isMongoId: { errorMessage: "each platform id must be a valid MongoId" },
  },
  studio: {
    in: ["body"],
    optional: true,
    isMongoId: { errorMessage: "studio must be a valid MongoId" },
  },
  description: { in: ["body"], optional: true },
});

const game_id = [param("id").isMongoId().withMessage("Invalid game id")];

// studio
const saveStudioRules = checkSchema({
  name: {
    in: ["body"],
    notEmpty: { errorMessage: "name is required" },
  },
  foundedYear: {
    in: ["body"],
    optional: true,
    isInt: { errorMessage: "foundedYear must be an integer" },
  },
  country: { in: ["body"], optional: true },
  website: {
    in: ["body"],
    optional: true,
    isURL: { errorMessage: "website must be a URL" },
  },
  description: { in: ["body"], optional: true },
});

// GENRE
const saveGenreRules = checkSchema({
  name: { in: ["body"], notEmpty: { errorMessage: "name is required" } },
  description: { in: ["body"], optional: true },
});

// PLATFORM
const savePlatformRules = checkSchema({
  name: { in: ["body"], notEmpty: { errorMessage: "name is required" } },
  manufacturer: {
    in: ["body"],
    notEmpty: { errorMessage: "manufacturer is required" },
  },
  releaseYear: {
    in: ["body"],
    optional: true,
    isInt: { errorMessage: "releaseYear must be an integer" },
  },
  type: { in: ["body"], optional: true },
  country: {
    in: ["body"],
    notEmpty: { errorMessage: "Country can't be empty" },
  },
  foundedYear: {
    in: ["body"],
    notEmpty: { errorMessage: "foundedYear can't be empty" },
  },
  website: {
    in: ["body"],
    optional: true,
    isURL: { errorMessage: "website must be a URL" },
  },
});

const studio_id = [param("id").isMongoId().withMessage("Invalid studio id")];
const genre_id = [param("id").isMongoId().withMessage("Invalid genre id")];
const platform_id = [
  param("id").isMongoId().withMessage("Invalid platform id"),
];

module.exports = {
  saveGameRules,
  game_id,
  saveStudioRules,
  studio_id,
  saveGenreRules,
  genre_id,
  savePlatformRules,
  platform_id,
};
