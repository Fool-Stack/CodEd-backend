const Course = require("../models/courses");
const User = require("../models/user");

const mongoose = require("mongoose");

exports.addCourse = async (req, res) => {
  const { description, title, price, numberOfLessons } = req.body;

  const course = new Course({
    _id: new mongoose.Types.ObjectId(),
    description,
    instructor: req.user.userId,
    title,
    timestamp: Date.now(),
    price,
    numberOfLessons,
  });

  await course
    .save()
    .then((savedCourse) => {
      return res.status(200).json({
        success: true,
        message: "Created Successfully",
        lesson: savedCourse,
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
exports.updateCourse = async (req, res) => {
  const { id, description, title, price, numberOfLessons } = req.body;

  const course = await Course.updateOne(
    {
      _id: id,
    },
    {
      description,
      instructor: req.user.userId,
      title,
      timestamp: Date.now(),
      price,
      numberOfLessons,
    }
  )
    .then((updatedCourse) => {
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

exports.getCourse = async (req, res) => {
  const { id } = req.body;
  const course = await Course.findById(id);
  if (course) {
    return res.status(200).json({
      success: true,
      message: "Retrieved Successfully",
      course: course,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.getAllCourses = async (req, res) => {
  const course = await Course.find({});
  if (course) {
    return res.status(200).json({
      success: true,
      message: "Retrieved Successfully",
      courses: course,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

exports.deleteCourse = async (req, res) => {
  const { id } = req.body;
  await Course.deleteOne({
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


exports.enroll = async (req,res)=>{
  const {userId} = req.user
  const {courseId} = req.body

   User.findById(userId).then(async(user)=>{

   user.courses.forEach((course)=>{
     if(course==courseId){
       return res.status(400).json({
         success:false,
         message:'Already enrolled'
       })
     }
   })

   await User.updateOne({_id:userId},{$addToSet:{courses:courseId}})
    .then(async ()=>{

      await Course.updateOne({_id:courseId},{$addToSet:{students:userId}})
        .then(()=>{
          res.status(200).json({
            success:true,
            message:'Successfully enrolled'
          })
        }).catch((err)=>{
          res.status(500).json({
            success: false,
            message: "Something went wrong",
            err: err.toString(),
          });
        })

    }).catch((err)=>{
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        err: err.toString(),
      });
    })
  })
  .catch((err)=>{
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      err: err.toString(),
    });
  })

}

