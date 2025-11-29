const Genre = require("../models/Genre");
const mongoose = require("mongoose");
const { Types } = require("mongoose");

// GET /genres
const getAll = async (req, res) => {
  //#swagger.tags = ['Genres']
  try {
    const genres = await Genre.find().lean();
    return res.status(200).json(genres); // 200 OK
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving genres", error: error.message }); // 500
  }
};

// GET /genres/:id
const getSingle = async (req, res) => {
  //#swagger.tags = ['Genres']
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid genre id" }); // 400
    }

    const genre = await Genre.findById(id).lean();

    if (!genre) {
      return res.status(404).json({ message: "Genre not found" }); // 404
    }

    return res.status(200).json(genre); // 200
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving genre", error: error.message }); // 500
  }
};

// POST /genres
const create = async (req, res) => {
  //#swagger.tags = ['Genres']
  try {
    const genre = new Genre(req.body);
    const saved = await genre.save();
    return res.status(201).json(saved); // 201 Created
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating genre", error: error.message }); // 500
  }
};

// PUT /genres/:id
const updateByid = async (req, res) => {
  //#swagger.tags = ['Genres']
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid genre id" }); // 400
    }

    const updated = await Genre.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return res.status(404).json({ message: "Genre not found" }); // 404
    }

    return res.status(200).json(updated); // 200
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating genre", error: error.message }); // 500
  }
};

// DELETE /genres/:id
const deleteByid = async (req, res) => {
  //#swagger.tags = ['Genres']
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid genre id" }); // 400
    }

    const deleted = await Genre.findByIdAndDelete(id).lean();

    if (!deleted) {
      return res.status(404).json({ message: "Genre not found" }); // 404
    }

    return res.status(200).json({ message: "Genre deleted" }); // 200
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting genre", error: error.message }); // 500
  }
};

module.exports = {
  getAll,
  getSingle,
  create,
  updateByid,
  deleteByid,
};
