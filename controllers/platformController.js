const Platform = require("../models/Platform");
const mongoose = require("mongoose");
const { Types } = mongoose;

// GET /platforms
const getAll = async (req, res) => {
  try {
    const platforms = await Platform.find().lean();
    return res.status(200).json(platforms);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving platforms", error: error.message });
  }
};

// GET /platforms/:id
const getSingle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid platform id" });
    }

    const platform = await Platform.findById(id).lean();

    if (!platform) {
      return res.status(404).json({ message: "Platform not found" });
    }

    return res.status(200).json(platform);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving platform", error: error.message });
  }
};

// POST /platforms
const create = async (req, res) => {
  try {
    const platform = new Platform(req.body);
    const saved = await platform.save();
    return res.status(201).json(saved);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating platform", error: error.message });
  }
};

// PUT /platforms/:id
const updateByid = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid platform id" });
    }

    const updated = await Platform.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return res.status(404).json({ message: "Platform not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating platform", error: error.message });
  }
};

// DELETE /platforms/:id
const deleteByid = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid platform id" });
    }

    const deleted = await Platform.findByIdAndDelete(id).lean();

    if (!deleted) {
      return res.status(404).json({ message: "Platform not found" });
    }

    return res.status(200).json({ message: "Platform deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting platform", error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  create,
  updateByid,
  deleteByid,
};