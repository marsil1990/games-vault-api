const Platform = require("../models/Platform");
const mongoose = require("mongoose");
const { Types } = require("mongoose");

// GET /platforms
const getAll = async (req, res) => {
  //#swagger.tags = ['Platforms']
  try {
    const platforms = await Platform.find().lean();
    return res.status(200).json(platforms); // 200 OK
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving platforms", error: error.message }); // 500
  }
};

// GET /platforms/:id
const getSingle = async (req, res) => {
  //#swagger.tags = ['Platforms']
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid platform id" }); // 400
    }

    const platform = await Platform.findById(id).lean();

    if (!platform) {
      return res.status(404).json({ message: "platform not found" }); // 404
    }

    return res.status(200).json(platform); // 200
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving platform", error: error.message }); // 500
  }
};

// POST /platforms
const create = async (req, res) => {
  //#swagger.tags = ['Platforms']
  try {
    const platform = new Platform(req.body);
    const saved = await platform.save();
    return res.status(201).json(saved); // 201 Created
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating platform", error: error.message }); // 500
  }
};

// PUT /platforms/:id
const updateByid = async (req, res) => {
  //#swagger.tags = ['Platforms']
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid platform id" }); // 400
    }

    const updated = await Platform.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return res.status(404).json({ message: "Platform not found" }); // 404
    }

    return res.status(200).json(updated); // 200
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating platform", error: error.message }); // 500
  }
};

// DELETE /platforms/:id
const deleteByid = async (req, res) => {
  //#swagger.tags = ['Platforms']
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid platform id" }); // 400
    }

    const deleted = await Platform.findByIdAndDelete(id).lean();

    if (!deleted) {
      return res.status(404).json({ message: "platform not found" }); // 404
    }

    return res.status(200).json({ message: "platform deleted" }); // 200
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting platform", error: error.message }); // 500
  }
};

module.exports = {
  getAll,
  getSingle,
  create,
  updateByid,
  deleteByid,
};
