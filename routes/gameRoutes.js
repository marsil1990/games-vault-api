const routes = require("express").Router();
const requireAuth = require("../middleware/authentication");

const validateRequest = require("../middleware/validate");
const { saveGameRules, game_id } = require("../middleware/rules");
const gameController = require('../controllers/generalController');
const collection = "games";


// GET all, GET by id
routes.get("/", gameController.getAll(collection));
routes.get("/:id", game_id, validateRequest, gameController.getSingle(collection));

// POST /games
routes.post(
  "/",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  saveGameRules,
  validateRequest,
  gameController.create(collection)
);

// PUT /games/:id
routes.put(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  game_id,
  saveGameRules,
  validateRequest,
  gameController.updateByid(collection)
);

// DELETE /games/:id
routes.delete(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  game_id,
  validateRequest,
  gameController.deleteByid(collection)
);

module.exports = routes;
