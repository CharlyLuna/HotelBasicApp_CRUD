const { matchedData, body } = require("express-validator");
const { roomsModel } = require("../models");
const handleHttpError = require("../utils/handleError");

// Obtain list from the database
const getRooms = async (req, res) => {
  try {
    const data = await roomsModel.find({});
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "Error getting rooms", 500);
  }
};
// Obtain a single item from the database
const getRoom = async (req, res) => {
  try {
    req = matchedData(req);
    const { _id } = req;
    console.log(_id);
    const data = await roomsModel.findById(_id);
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "Error getting room", 500);
  }
};
// Create a new item in the database
const createRoom = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await roomsModel.create(body);
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "Error creating room", 500);
  }
};
// Update an item in the database
const updateRoom = async (req, res) => {
  try {
    req = matchedData(req);
    const { _id, ...body } = req;
    const data = await roomsModel.findByIdAndUpdate(_id, body, { new: true });
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "Error updating room", 400);
  }
};
// Delete an item from the database
const deleteRoom = async (req, res) => {
  try {
    req = matchedData(req);
    const { _id } = req;
    console.log(_id);
    const data = await roomsModel.findOneAndDelete({ _id });
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "Error deleting room", 500);
  }
};

module.exports = {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
};
