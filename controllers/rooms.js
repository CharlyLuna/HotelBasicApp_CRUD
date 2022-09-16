const { roomsModel } = require("../models");

// Obtain list from the database
const getRooms = async (req, res) => {
  const data = await roomsModel.find({});
  res.send({ data });
};
// Obtain a single item from the database
const getRoom = (req, res) => {};
// Create a new item in the database
const createRoom = async (req, res) => {
  const { body } = req;
  console.log(body);
  const data = await roomsModel.create(body);
  res.send({ data });
};
// Update an item in the database
const updateRoom = (req, res) => {};
// Delete an item from the database
const deleteRoom = (req, res) => {};

module.exports = {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
};