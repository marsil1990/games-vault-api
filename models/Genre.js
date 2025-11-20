const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: { type: String, requires: true, unique: true },
  description: { type: String },
});

module.exports = mongoose.model("Genre", genreSchema, "genre");
