const express = require("express");
const router = express.Router();
const { validatorCreateRoom } = require("../validators/rooms");
const {
  getRooms,
  // getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/rooms");

router.get("/", getRooms);
router.post("/", validatorCreateRoom, createRoom);
router.put("/:_id", updateRoom);

module.exports = router;
