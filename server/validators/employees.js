const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const { employeesModel } = require("../models");

const validatorCreateEmployee = [
  check("email")
    .exists()
    .notEmpty({ min: 1, max: 4 })
    .isString()
    .custom(async (value) => {
      return await employeesModel.findOne({ email: value }).then((employee) => {
        if (employee) {
          return Promise.reject("Email already in use");
        }
      });
    }),
  check("name").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("lastName").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("password").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("role").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("age").exists().notEmpty().isNumeric(),
  (req, res, next) => validateResults(req, res, next),
];

const validatorGetEmployee = [
  check("_id").exists().notEmpty().isMongoId(),
  (req, res, next) => validateResults(req, res, next),
];

const validatorUpdateEmployee = [
  check("email").exists().notEmpty().isString(),
  check("name").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("lastName").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("password").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("role").exists().notEmpty({ min: 1, max: 20 }).isString(),
  check("age").exists().notEmpty().isNumeric(),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = {
  validatorCreateEmployee,
  validatorGetEmployee,
  validatorUpdateEmployee,
};
