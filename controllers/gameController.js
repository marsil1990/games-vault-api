const Game = require("../models/Game");
const mongoose = require("mongoose");
const { Types } = mongoose;

// GET /games
const getAll = async (req, res) => {
  //#swagger.tags = ['Games']
  try {
    const games = await Game.find().lean();
    return res.status(200).json(games); // 200 OK
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving games", error: error.message }); // 500
  }
};

// GET /games/:id
const getSingle = async (req, res) => {
  //#swagger.tags = ['Games']
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid game id" }); // 400
    }

    const game = await Game.findById(id).lean();

    if (!game) {
      return res.status(404).json({ message: "Game not found" }); // 404
    }

    return res.status(200).json(game); // 200
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving game", error: error.message }); // 500
  }
};

// POST /games
const create = async (req, res) => {
  //#swagger.tags = ['Games']
  try {
    const game = new Game(req.body);
    const saved = await game.save();
    return res.status(201).json(saved); // 201 Created
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating game", error: error.message }); // 500
  }
};

// PUT /games/:id
const updateByid = async (req, res) => {
  //#swagger.tags = ['Games']
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid game id" }); // 400
    }

    const updated = await Game.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return res.status(404).json({ message: "Game not found" }); // 404
    }

    return res.status(200).json(updated); // 200
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating game", error: error.message }); // 500
  }
};

// DELETE /games/:id
const deleteByid = async (req, res) => {
  //#swagger.tags = ['Games']
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid game id" }); // 400
    }

    const deleted = await Game.findByIdAndDelete(id).lean();

    if (!deleted) {
      return res.status(404).json({ message: "Game not found" }); // 404
    }

    return res.status(200).json({ message: "Game deleted" }); // 200
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting game", error: error.message }); // 500
  }
};

module.exports = {
  getAll,
  getSingle,
  create,
  updateByid,
  deleteByid,
};
