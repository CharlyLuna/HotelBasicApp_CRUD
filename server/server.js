require("dotenv").config();
const express = require("express");
const dbConnect = require("../config/mongo");
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

dbConnect();
