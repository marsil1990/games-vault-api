const mongoose = require("mongoose");

const studioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  foundedYear: { type: Number },
  country: { type: String },
  website: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Studio", studioSchema, "studio");
