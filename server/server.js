require("dotenv").config();
const express = require("express");
const dbConnect = require("../config/mongo");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static("public"));

const port = process.env.PORT || 3000;

app.use("/api", require("../routes"));

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

dbConnect();
