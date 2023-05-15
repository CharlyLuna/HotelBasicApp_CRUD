const express = require("express");
const router = express.Router();
const {
  validatorCreateEmployee,
  validatorGetEmployee,
  validatorUpdateEmployee,
} = require("../validators/employees");
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employees");

router.get("/", getEmployees);
router.get("/:_id", validatorGetEmployee, getEmployee);
router.post("/", validatorCreateEmployee, createEmployee);
router.put(
  "/:_id",
  validatorGetEmployee,
  validatorUpdateEmployee,
  updateEmployee
);
router.delete("/:_id", validatorGetEmployee, deleteEmployee);

module.exports = router;
