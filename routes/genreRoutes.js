const routes = require("express").Router();
const requireAuth = require("../middleware/authentication");

const validateRequest = require("../middleware/validate");
const { saveGenreRules, genre_id } = require("../middleware/rules");
const genreController = require('../controllers/generalController');
const collection = "genres";

// GET all, GET by id
routes.get("/", genreController.getAll(collection));
routes.get("/:id", genre_id, validateRequest, genreController.getSingle(collection));


// POST /genres
routes.post(
  "/",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  saveGenreRules,
  validateRequest,
  genreController.create(collection)
);

// PUT /genres/:id
routes.put(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  genre_id,
  saveGenreRules,
  validateRequest,
  genreController.updateByid(collection)
);

// DELETE /genres/:id
routes.delete(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  genre_id,
  validateRequest,
  genreController.deleteByid(collection)
);

module.exports = routes;
