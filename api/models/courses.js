const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	description: { type: String },
  instructor : { type : mongoose.Schema.Types.ObjectId, ref: "Instructor"},
  title: { type: String },
  price: { type: Number },
  numberOfLessons: { type: Number },
  timestamp: { type: Date },
  students:{type:Array}
});

module.exports = mongoose.model("Course", courseSchema);
