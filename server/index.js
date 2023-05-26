require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/mongo");
const app = express();
const cors = require('cors')

app.use(cors({
  origin: ['http://localhost:5173','https://hotel-app-crud.netlify.app/']
}))

app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

dbConnect();
