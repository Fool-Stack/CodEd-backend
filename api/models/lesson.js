const mongoose = require("mongoose");
const lessonSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	course: { type: mongoose.Schema.Types.ObjectID, ref: "Course" },
	description: { type: String },
  instructor : { type : mongoose.Schema.Types.ObjectId, ref: "Instructor"},
  title: { type: String },
  video: { type: String },
  events: { type: Array },
  timestamp: { type: Date },
});

module.exports = mongoose.model("Lesson", lessonSchema);
