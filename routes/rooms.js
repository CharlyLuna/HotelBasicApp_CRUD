const express = require("express");
const router = express.Router();
const {
  validatorCreateRoom,
  validatorGetRoom,
  validatorUpdateRoom,
} = require("../validators/rooms");
const {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/rooms");

router.get("/", getRooms);
router.get("/:_id", validatorGetRoom, getRoom);
router.post("/", validatorCreateRoom, createRoom);
router.put("/:_id", validatorGetRoom, validatorUpdateRoom, updateRoom);
router.delete("/:_id", validatorGetRoom, deleteRoom);

module.exports = router;
