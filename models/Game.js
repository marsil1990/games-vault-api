const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  releaseYear: { type: Number },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  platforms: [{ type: Schema.Types.ObjectId, ref: "Platform" }],
  studio: { type: Schema.Types.ObjectId, ref: "Studio" },
  multiplayer: { type: Boolean, default: false },
  language: { type: String },
});

module.exports = mongoose.model("Game", gameSchema, "game");
