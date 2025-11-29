const routes = require("express").Router();
const requireAuth = require("../middleware/authentication");

const validateRequest = require("../middleware/validate");
const { savePlatformRules, platform_id } = require("../middleware/rules");
const platformController = require("../controllers/platformController");

// GET /platforms
routes.get("/", platformController.getAll);

// GET /platforms/:id
routes.get("/:id", platform_id, validateRequest, platformController.getSingle);

// POST /platforms
routes.post(
  "/",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  savePlatformRules,
  validateRequest,
  platformController.create
);

// PUT /platforms/:id
routes.put(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  platform_id,
  savePlatformRules,
  validateRequest,
  platformController.updateByid
);

// DELETE /platforms/:id
routes.delete(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  platform_id,
  validateRequest,
  platformController.deleteByid
);

module.exports = routes;
