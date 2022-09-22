const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateRoom = [
  check("roomNumber").exists().notEmpty({ min: 1, max: 4 }).isString(),
  check("roomType").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("roomPrice").exists().notEmpty().isNumeric(),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = { validatorCreateRoom };
