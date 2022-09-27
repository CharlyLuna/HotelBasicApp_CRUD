const express = require("express");
const router = express.Router();
const {
  validatorCreateGuest,
  validatorGetGuest,
  validatorUpdateGuest,
} = require("../validators/guests");
const {
  getGuests,
  getGuest,
  createGuest,
  updateGuest,
  deleteGuest,
} = require("../controllers/guests");

router.get("/", getGuests);
router.get("/:_id", validatorGetGuest, getGuest);
router.post("/", validatorCreateGuest, createGuest);
router.put("/:_id", validatorGetGuest, validatorUpdateGuest, updateGuest);
router.delete("/:_id", validatorGetGuest, deleteGuest);

module.exports = router;
