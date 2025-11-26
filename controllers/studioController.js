const Studio = require("../models/Studio");
const mongoose = require("mongoose");
const { Types } = mongoose;

// GET /studios
const getAll = async (req, res) => {
  try {
    const studios = await Studio.find().lean();
    return res.status(200).json(studios); // 200
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving studios", error: error.message }); // 500
  }
};

// GET /studios/:id
const getSingle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid studio id" }); // 400
    }

    const studio = await Studio.findById(id).lean();

    if (!studio) {
      return res.status(404).json({ message: "Studio not found" }); // 404
    }

    return res.status(200).json(studio); // 200
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving studio", error: error.message }); // 500
  }
};

// POST /studios
const create = async (req, res) => {
  try {
    const studio = new Studio(req.body);
    const saved = await studio.save();
    return res.status(201).json(saved); // 201
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating studio", error: error.message }); // 500
  }
};

// PUT /studios/:id
const updateByid = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid studio id" }); // 400
    }

    const updated = await Studio.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return res.status(404).json({ message: "Studio not found" }); // 404
    }

    return res.status(200).json(updated); // 200
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating studio", error: error.message }); // 500
  }
};

// DELETE /studios/:id
const deleteByid = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid studio id" }); // 400
    }

    const deleted = await Studio.findByIdAndDelete(id).lean();

    if (!deleted) {
      return res.status(404).json({ message: "Studio not found" }); // 404
    }

    return res.status(200).json({ message: "Studio deleted" }); // 200
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting studio", error: error.message }); // 500
  }
};

module.exports = {
  getAll,
  getSingle,
  create,
  updateByid,
  deleteByid,
};
