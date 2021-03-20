const Lesson = require("../models/lesson");

const mongoose = require("mongoose");

exports.addLesson = async (req, res) => {
  const { course, description, instructor, title, events } = req.body;

  const lesson = new Lesson({
    _id: new mongoose.Types.ObjectId(),
    course,
    description,
    instructor,
    title,
    events,
    timestamp: Date.now(),
    video: req.file.location,
  });

  await lesson
    .save()
    .then((savedLesson) => {
      return res.status(200).json({
        success: true,
        message: "Created Successfully",
        lesson: savedLesson,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        err: err.toString(),
      });
    });
};

exports.addLessonWithoutVideo = async (req, res) => {
  const { course, description, instructor, title, events } = req.body;

  const lesson = new Lesson({
    _id: new mongoose.Types.ObjectId(),
    course,
    description,
    instructor,
    title,
    events,
    timestamp: Date.now(),
  });

  await lesson
    .save()
    .then((savedLesson) => {
      return res.status(200).json({
        success: true,
        message: "Created Successfully",
        lesson: savedLesson,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        err: err.toString(),
      });
    });
};

exports.updateLesson = async (req, res) => {
  const {id, course, description, instructor, title, events } = req.body;

  const lesson = await Lesson.updateOne({
    _id: id
  },{
    course,
    description,
    instructor,
    title,
    events,
    timestamp: Date.now(),
  }).then((updatedLesson) => {
      return res.status(200).json({
        success: true,
        message: "updated Successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        err: err.toString(),
      });
    });
};


exports.getLesson = async(req, res) => {
  const { id } = req.body;
  const lesson = await Lesson.findById(id);
  if(lesson){
    return res.status(200).json({
      success: true,
      message: "Created Successfully",
      lesson: lesson,
    });
  }else{
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      err: err.toString(),
    });
  }
}

exports.deleteLesson = async (req, res) => {

}

exports.checkEnrolled = async (req, res) => {
  
}