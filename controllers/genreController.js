const Genre = require("../models/Genre");
const mongoose = require("mongoose");
const { Types } = mongoose;

// GET /genres
const getAll = async (req, res) => {
  try {
    const genres = await Genre.find().lean();
    return res.status(200).json(genres);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving genres", error: error.message });
  }
};

// GET /genres/:id
const getSingle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid genre id" });
    }

    const genre = await Genre.findById(id).lean();

    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    return res.status(200).json(genre);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving genre", error: error.message });
  }
};

// POST /genres
const create = async (req, res) => {
  try {
    const genre = new Genre(req.body);
    const saved = await genre.save();
    return res.status(201).json(saved);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating genre", error: error.message });
  }
};

// PUT /genres/:id
const updateByid = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid genre id" });
    }

    const updated = await Genre.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return res.status(404).json({ message: "Genre not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating genre", error: error.message });
  }
};

// DELETE /genres/:id
const deleteByid = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid genre id" });
    }

    const deleted = await Genre.findByIdAndDelete(id).lean();

    if (!deleted) {
      return res.status(404).json({ message: "Genre not found" });
    }

    return res.status(200).json({ message: "Genre deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting genre", error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  create,
  updateByid,
  deleteByid,
};
