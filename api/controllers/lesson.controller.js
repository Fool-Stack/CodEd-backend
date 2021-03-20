const Lesson = require("../models/lesson");
const User = require("../models/user");

const mongoose = require("mongoose");

exports.addLesson = async (req, res) => {
  const { course, description, title, events } = req.body;

  const lesson = new Lesson({
    _id: new mongoose.Types.ObjectId(),
    course,
    description,
    instructor: req.user.userId,
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

exports.addVideo = async (req, res) => {
  const { id } = req.body;
  const lesson = await Lesson.updateOne(
    {
      _id: id,
    },
    {
      video: req.file.location
    }
  )
    .then((updatedLesson) => {
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


exports.addLessonWithoutVideo = async (req, res) => {
  const { course, description, title, events, language } = req.body;

  const lesson = new Lesson({
    _id: new mongoose.Types.ObjectId(),
    course,
    description,
    instructor: req.user.userId,
    title,
    events,
    language,
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
  const { id, course, description, title, events, language } = req.body;

  const lesson = await Lesson.updateOne(
    {
      _id: id,
    },
    {
      course,
      description,
      instructor: req.user.userId,
      title,
      events,
      language,
      timestamp: Date.now(),
    }
  )
    .then((updatedLesson) => {
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

exports.getAllLessons = async (req, res) => {
  const { id } = req.body;
  const lessons = await Lesson.find({course:id});
  if (lessons) {
    return res.status(200).json({
      success: true,
      message: "Retrieved Successfully",
      lesson: lessons,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.getLesson = async (req, res) => {
  const { id } = req.body;
  const lesson = await Lesson.findById(id);
  if (lesson) {
    return res.status(200).json({
      success: true,
      message: "Retrieved Successfully",
      lesson: lesson,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.deleteLesson = async (req, res) => {
  const { id } = req.body;
  await Lesson.deleteOne({
    _id: id,
  })
    .then((deleted) => {
      return res.status(200).json({
        success: true,
        message: "Deleted Successfully",
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

exports.checkEnrolled = async (req, res) => {
  const user = await User.findById(req.user.userId)
  const { courseId } = req.body;
  let flag = 0
  if(user){
    for(let course of user.courses){
      if(courseId == course){
        flag =1
      }
    }
    if(flag == 1){
      return res.status(200).json({
        success: true,
        message: "User is valid"
      })
    }else{
      return res.status(403).json({
        success: false,
        message: "User is invalid"
      })
    }
  }
};
