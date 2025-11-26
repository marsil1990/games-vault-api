const routes = require("express").Router();
const requireAuth = require("../middleware/authentication");

const validateRequest = require("../middleware/validate");
const { saveGameRules, game_id } = require("../middleware/rules");
const gameController = require("../controllers/gameController");

// GET all, GET by id
routes.get("/", gameController.getAll);
routes.get("/:id", game_id, validateRequest, gameController.getSingle);

// POST /games
routes.post(
  "/",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  saveGameRules,
  validateRequest,
  gameController.create
);

// PUT /games/:id
routes.put(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  game_id,
  saveGameRules,
  validateRequest,
  gameController.updateByid
);

// DELETE /games/:id
routes.delete(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  game_id,
  validateRequest,
  gameController.deleteByid
);

module.exports = routes;
