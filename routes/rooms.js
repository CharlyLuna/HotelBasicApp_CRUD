const express = require("express");
const router = express.Router();
const {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/rooms");

router.get("/", getRooms);
router.post("/", createRoom);

module.exports = router;
