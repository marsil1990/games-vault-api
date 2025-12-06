const routes = require("express").Router();
const requireAuth = require("../middleware/authentication");

const validateRequest = require("../middleware/validate");
const { savePlatformRules, platform_id } = require("../middleware/rules");
// const platformController = require("../controllers/platformController");
const platformController = require('../controllers/generalController');
const collection = "platforms";

// GET /platforms
routes.get("/", platformController.getAll(collection));

// GET /platforms/:id
routes.get("/:id", platform_id, validateRequest, platformController.getSingle(collection));

// POST /platforms
routes.post(
  "/",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  savePlatformRules,
  validateRequest,
  platformController.create(collection)
);

// PUT /platforms/:id
routes.put(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  platform_id,
  savePlatformRules,
  validateRequest,
  platformController.updateByid(collection)
);

// DELETE /platforms/:id
routes.delete(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  platform_id,
  validateRequest,
  platformController.deleteByid(collection)
);

module.exports = routes;
