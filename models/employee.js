const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: ["admin", "employee"],
      default: "employee",
      required: true,
    },
  },
  {
    timestamps: true, // this will automatically add the createdAt and the updatedAt field for us
    versionKey: false, // to disable the __v field
  }
);

module.exports = mongoose.model("employees", employeeSchema);
