const routes = require("express").Router();
const requireAuth = require("../middleware/authentication");

const validateRequest = require("../middleware/validate");
const { saveGenreRules, genre_id } = require("../middleware/rules");
const genreController = require("../controllers/genreController");

routes.get("/", genreController.getAll);
routes.get("/:id", genre_id, validateRequest, genreController.getSingle);
routes.post(
  "/",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  saveGenreRules,
  validateRequest,
  genreController.create
);
routes.put(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  genre_id,
  saveGenreRules,
  validateRequest,
  genreController.updateByid
);
routes.delete(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  genre_id,
  validateRequest,
  genreController.deleteByid
);

module.exports = routes;
