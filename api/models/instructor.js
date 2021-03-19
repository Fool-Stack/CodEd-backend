const mongoose = require("mongoose");

const instructorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  email: { type: String },
  password: { type: String },
  courses: { type: Array },
  number: { type: Number },
  type: { type: String },
});

module.exports = mongoose.model("Instructor", instructorSchema);
