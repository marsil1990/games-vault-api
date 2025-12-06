const Game = require("../models/Game");
const Studio = require("../models/Studio");
const Platform = require("../models/Platform");
const Genre = require("../models/Genre");

const mongoose = require("mongoose");
const { Types } = mongoose;


// GET /collection
function getAll(collection) {
      // console.log("1GeneralController Working")

  return async (req, res) => {
    try {
      let results;

      switch (collection) {
        case "games":
          results = await Game.find().lean();
          break;
        
        case "studios":
          results = await Studio.find().lean();
          break;
        
        case "platforms":
          results = await Platform.find().lean();
          break;
        
        case "genres":
          results = await Genre.find().lean();
          break;
      
        default:
          break;
      }

      res.status(200).json(results); // 200 OK

    } catch (error) {
      res
        .status(500)
        .json({ message: `Error retrieving ${collection}`, error: error.message }); // 500
    }
  }
};


// GET /collection/:id
function getSingle(collection) {
      // console.log("2GeneralController Working")

  return async (req, res) => {

    try {
      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: `Invalid id for ${collection}' collection` }); // 400
      }

      let result;

      switch (collection) {
        case "games":
          result = await Game.findById(id).lean();
          break;
        
        case "studios":
          result = await Studio.findById(id).lean();
          break;
        
        case "platforms":
          result = await Platform.findById(id).lean();
          break;
        
        case "genres":
          result = await Genre.findById(id).lean();
          break;

        default:
          break;
      }

      if (!result) {
        return res.status(404).json({ message: `Item not found in ${collection}` }); // 404
      }

      res.status(200).json(result); // 200
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error retrieving from ${collection}`, error: error.message }); // 500
    }
  }
};

// POST /collection
function create(collection) {
      // console.log("3GeneralController Working")

  return async (req, res) => {

    try {
      let newItem;

      switch (collection) {
        case "games":
          newItem = new Game(req.body);
          break;
        
        case "studios":
          newItem = new Studio(req.body);
          break;
        
        case "platforms":
          newItem = new Platform(req.body);
          break;
        
        case "genres":
          newItem = new Genre(req.body);
          break;
      
        default:
          break;
      }

      const saved = await newItem.save();
      res.status(201).json(saved); // 201 Created
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error creating instance in ${collection} collection`, error: error.message }); // 500
    }
  }
};

// PUT /collection/:id
function updateByid(collection) {
      // console.log("4GeneralController Working")

  return async (req, res) => {
    try {
      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: `Invalid id for ${collection}' collection` }); // 400
      }

      let updated;

      switch (collection) {
        case "games":
          updated = await Game.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          }).lean();
          break;
        
        case "studios":
          updated = await Studio.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          }).lean();
          break;
        
        case "platforms":
          updated = await Platform.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          }).lean();
          break;
        
        case "genres":
          updated = await Genre.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          }).lean();
          break;
      
        default:
          break;
      }

      if (!updated) {
        return res.status(404).json({ message: `Item not found in ${collection}` }); // 404
      }

      res.status(200).json(updated); // 200
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error updating instance in ${collection} collection`, error: error.message }); // 500
    }
  }
};

// DELETE /collection/:id
function deleteByid(collection) {

  return async (req, res) => {
    try {
      const { id } = req.params;

      console.log("5GeneralController Working")
      console.log("")


      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: `Invalid id for ${collection}' collection` }); // 400
      }

      let deleted;

      switch (collection) {
        case "games":
          deleted = await Game.findByIdAndDelete(id).lean();
          break;
        
        case "studios":
          deleted = await Studio.findByIdAndDelete(id).lean();
          break;
        
        case "platforms":
          deleted = await Platform.findByIdAndDelete(id).lean();
          break;
        
        case "genres":
          deleted = await Genre.findByIdAndDelete(id).lean();
          break;
      
        default:
          break;
      }

      if (!deleted) {
        return res.status(404).json({ message: `Item not found in ${collection}` }); // 404
      }

      res.status(200).json({ message: "Item deleted" }); // 200
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error deleting instance in ${collection} collection`, error: error.message }); // 500
    }
  }
};

module.exports = {
  getAll,
  getSingle,
  create,
  updateByid,
  deleteByid
};
