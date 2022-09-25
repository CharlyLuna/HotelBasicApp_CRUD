const { matchedData, body } = require("express-validator");
const { employeesModel } = require("../models");
const handleHttpError = require("../utils/handleError");

// Obtain list from the database
const getEmployees = async (req, res) => {
  try {
    const data = await employeesModel.find({});
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "Error getting employees", 500);
  }
};
// Obtain a single item from the database
const getEmployee = async (req, res) => {
  try {
    req = matchedData(req);
    const { _id } = req;
    console.log(_id);
    const data = await employeesModel.findById(_id);
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "Error getting employee", 500);
  }
};
// Create a new item in the database
const createEmployee = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await employeesModel.create(body);
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "Error creating employee", 500);
  }
};
// Update an item in the database
const updateEmployee = async (req, res) => {
  try {
    req = matchedData(req);
    const { _id, ...body } = req;
    const data = await employeesModel.findByIdAndUpdate(_id, body, {
      new: true,
    });
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "Error updating employee", 400);
  }
};
// Delete an item from the database
const deleteEmployee = async (req, res) => {
  try {
    req = matchedData(req);
    const { _id } = req;
    console.log(_id);
    const data = await employeesModel.findOneAndDelete({ _id });
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "Error deleting employee", 500);
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
