const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const { guestsModel } = require("../models");
const { roomsModel } = require("../models");

const validatorCreateGuest = [
  check("email")
    .exists()
    .notEmpty({ min: 1, max: 4 })
    .isString()
    .custom(async (value) => {
      return await guestsModel.findOne({ email: value }).then((employee) => {
        if (employee) {
          return Promise.reject("Email already in use");
        }
      });
    }),
  check("name").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("lastName").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("phoneNumber").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("roomNumber")
    .exists()
    .notEmpty({ min: 1, max: 20 })
    .isString()
    .custom(async (value) => {
      return await roomsModel.findOne({ roomNumber: value }).then((room) => {
        if (!room) {
          return Promise.reject("Room number does not exist");
        } else if (room.roomStatus == false) {
          return Promise.reject("Room is not available");
        }
      });
    }),
  check("checkInDate").exists().notEmpty().isISO8601("yyyy-mm-dd").toDate(),
  check("checkOutDate").exists().notEmpty().isISO8601("yyyy-mm-dd").toDate(),
  check("numberOfGuests").exists().notEmpty().isNumeric(),
  check("paymentMethod").exists().notEmpty({ min: 1, max: 20 }).isString(),
  (req, res, next) => validateResults(req, res, next),
];

const validatorGetGuest = [
  check("_id").exists().notEmpty().isMongoId(),
  (req, res, next) => validateResults(req, res, next),
];

const validatorUpdateGuest = [
  check("email").exists().notEmpty().isString(),
  check("name").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("lastName").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("phoneNumber").exists().notEmpty({ min: 10, max: 10 }).isString(),
  check("roomNumber")
    .exists()
    .notEmpty({ min: 1, max: 20 })
    .isString()
    .custom(async (value) => {
      return await roomsModel.findOne({ roomNumber: value }).then((room) => {
        const oldRoom = room.roomNumber;
        if (!room) {
          return Promise.reject("Room number does not exist");
        } else if (room.roomStatus == false && value != oldRoom) {
          return Promise.reject("Room is not available");
        }
      });
    }),
  check("checkInDate").exists().notEmpty().isISO8601("yyyy-mm-dd").toDate(),
  check("checkOutDate").exists().notEmpty().isISO8601("yyyy-mm-dd").toDate(),
  check("numberOfGuests").exists().notEmpty().isNumeric(),
  check("paymentMethod").exists().notEmpty({ min: 1, max: 20 }).isString(),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = {
  validatorCreateGuest,
  validatorGetGuest,
  validatorUpdateGuest,
};
