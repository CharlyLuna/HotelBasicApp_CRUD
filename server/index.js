require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/mongo");
const app = express();
const cors = require('cors')

app.use(cors({
  origin: '*'
}))

app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

dbConnect();
