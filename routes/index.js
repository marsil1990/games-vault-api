const routes = require("express").Router();

routes.use("/", require("./authRoutes"));
routes.use("/", require("./swagger"));
routes.use("/games", require("./gameRoutes"));
routes.use("/studios", require("./studioRoutes"));
// routes.use("/genres", require("./genreRoutes"));
// routes.use("/platforms", require("./platformRoutes"));

module.exports = routes;
