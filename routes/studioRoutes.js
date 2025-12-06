const routes = require("express").Router();
const requireAuth = require("../middleware/authentication");

const validateRequest = require("../middleware/validate");
const { saveStudioRules, studio_id } = require("../middleware/rules");
// const studioController = require("../controllers/studioController");
const studioController = require('../controllers/generalController');
const collection = "studios";

// GET /studios
routes.get("/", studioController.getAll(collection));

// GET /studios/:id
routes.get("/:id", studio_id, validateRequest, studioController.getSingle(collection));

// POST /studios
routes.post(
  "/",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  saveStudioRules,
  validateRequest,
  studioController.create(collection)
);

// PUT /studios/:id
routes.put(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  studio_id,
  saveStudioRules,
  validateRequest,
  studioController.updateByid(collection)
);

// DELETE /studios/:id
routes.delete(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  studio_id,
  validateRequest,
  studioController.deleteByid(collection)
);

module.exports = routes;
