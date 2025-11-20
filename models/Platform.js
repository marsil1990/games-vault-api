const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  releaseYear: { type: Number },
  type: { type: String },
  country: { type: String, required: true },
  foundedYear: { type: Number, require: true },
  website: { type: String },
});

module.exports = mongoose.model("Platform", platformSchema, "platform");
