const { matchedData } = require("express-validator");
const { guestsModel } = require("../models");
const { roomsModel } = require("../models");
const handleHttpError = require("../utils/handleError");

// Obtain list from the database
const getGuests = async (req, res) => {
  try {
    const data = await guestsModel.find({});
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "Error getting guests", 500);
  }
};
// Obtain a single item from the database
const getGuest = async (req, res) => {
  try {
    req = matchedData(req);
    const { _id } = req;
    const data = await guestsModel.findById(_id);
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "Error getting guest", 500);
  }
};
// Create a new item in the database
const createGuest = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await guestsModel.create(body);
    await roomsModel.findOneAndUpdate(
      { roomNumber: body.roomNumber },
      { roomStatus: false }
    );
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "Error creating guest", 500);
  }
};
// Update an item in the database
const updateGuest = async (req, res) => {
  try {
    req = matchedData(req);
    const { _id, ...body } = req;
    const oldRoom = await guestsModel.findById(_id).select("roomNumber");
    const data = await guestsModel.findByIdAndUpdate(_id, body, {
      new: true,
    });

    if (body.roomNumber != oldRoom.roomNumber) {
      //Update old room status
      await roomsModel.findOneAndUpdate(
        { roomNumber: oldRoom.roomNumber },
        { roomStatus: true }
      );
      //Update new room status
      await roomsModel.findOneAndUpdate(
        { roomNumber: body.roomNumber },
        { roomStatus: false }
      );
    }
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "Error updating guest", 400);
  }
};
// Delete an item from the database
const deleteGuest = async (req, res) => {
  try {
    req = matchedData(req);
    const { _id } = req;
    const guest = await guestsModel.findById(_id);
    const data = await guestsModel.findByIdAndDelete(_id);
    await roomsModel.findOneAndUpdate(
        { roomNumber: guest.roomNumber },
        {$set: { roomStatus: true }}
    );
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "Error deleting guest", 500);
  }
};

module.exports = {
  getGuests,
  getGuest,
  createGuest,
  updateGuest,
  deleteGuest,
};
