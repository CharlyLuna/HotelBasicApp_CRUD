//THIS IS WIP

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // this will automatically add the createdAt and the updatedAt field for us
    versionKey: false, // to disable the __v field
  }
);

module.exports = mongoose.model("services", serviceSchema);
