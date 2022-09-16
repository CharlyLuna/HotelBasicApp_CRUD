const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const data = ["room1", "room2", "room3"];
  res.send({ data });
});

module.exports = router;
