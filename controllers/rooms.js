const { roomsModel } = require("../models");

// Obtain list from the database
const getRooms = async (req, res) => {
  const data = await roomsModel.find({});
  res.send({ data });
};
// Obtain a single item from the database
// const getRoom = (req, res) => {}; Maybe not needed
// Create a new item in the database
const createRoom = async (req, res) => {
  const { body } = req;

  const data = await roomsModel.create(body).catch((err) => {
    console.log(err);
    res.send({ Message: "Error" });
  });

  if (data) res.send({ data });
};
// Update an item in the database
const updateRoom = (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  roomsModel.findByIdAndUpdate(_id, req.body, { new: true }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ data });
    }
  });
};
// Delete an item from the database
const deleteRoom = (req, res) => {};

module.exports = {
  getRooms,
  // getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
};
