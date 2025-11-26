const routes = require("express").Router();
const requireAuth = require("../middleware/authentication");

const validateRequest = require("../middleware/validate");
const { saveStudioRules, studio_id } = require("../middleware/rules");
const studioController = require("../controllers/studioController");

// GET /studios
routes.get("/", studioController.getAll);

// GET /studios/:id
routes.get("/:id", studio_id, validateRequest, studioController.getSingle);

// POST /studios
routes.post(
  "/",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  saveStudioRules,
  validateRequest,
  studioController.create
);

// PUT /studios/:id
routes.put(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  studio_id,
  saveStudioRules,
  validateRequest,
  studioController.updateByid
);

// DELETE /studios/:id
routes.delete(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  studio_id,
  validateRequest,
  studioController.deleteByid
);

module.exports = routes;
