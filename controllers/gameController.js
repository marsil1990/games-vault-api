const Game = require("../models/Game");
const mongoose = require("mongoose");
const { Types } = require("mongoose");

const getAll = async (req, res) => {
  try {
    const games = await Game.find().lean();
    res.status(200).json(games);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving games", error: error.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Must use a valid Game id to find a player." });
    }

    const game = await Game.findById(id).lean();
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.status(200).json(game);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving game", error: error.message });
  }
};

// const create = async (req, res) => {

// };

// const updateByid = async (req, res) => {

// };

// const deleteByid = async (req, res) => {

// };

module.exports = {
  getAll,
  getSingle,
};
