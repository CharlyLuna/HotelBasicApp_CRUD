const { check } = require("express-validator");
const { body } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const { roomsModel } = require("../models");

const validatorCreateRoom = [
  check("roomNumber")
    .exists()
    .notEmpty({ min: 1, max: 4 })
    .isString()
    .custom((value) => {
      return roomsModel.findOne({ roomNumber: value }).then((room) => {
        if (room) {
          return Promise.reject("Room number already in use");
        }
      });
    }),
  check("roomType").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("roomPrice").exists().notEmpty().isNumeric(),
  (req, res, next) => validateResults(req, res, next),
];

const validatorGetRoom = [
  check("_id").exists().notEmpty().isMongoId(),
  (req, res, next) => validateResults(req, res, next),
];

const validatorUpdateRoom = [
  check("roomNumber").exists().notEmpty({ min: 1, max: 4 }).isString(),
  check("roomType").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("roomPrice").exists().notEmpty().isNumeric(),
  check("roomStatus").exists().notEmpty().isBoolean(),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = { validatorCreateRoom, validatorGetRoom, validatorUpdateRoom };
