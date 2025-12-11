const routes = require("express").Router();
const requireAuth = require("../middleware/authentication");

const validateRequest = require("../middleware/validate");
const { saveGenreRules, genre_id } = require("../middleware/rules");
const genreController = require("../controllers/genreController");

// GET all, GET by id
routes.get("/", genreController.getAll);
routes.get("/:id", genre_id, validateRequest, genreController.getSingle);

// POST /genres
routes.post(
  "/",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  saveGenreRules,
  validateRequest,
  genreController.create
);

// PUT /genres/:id
routes.put(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  genre_id,
  saveGenreRules,
  validateRequest,
  genreController.updateByid
);

// DELETE /genres/:id
routes.delete(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  genre_id,
  validateRequest,
  genreController.deleteByid
);

module.exports = routes;
