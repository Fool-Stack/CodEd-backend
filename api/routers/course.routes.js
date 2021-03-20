const express = require("express");

const courseCntroller = require("../controllers/course.controller");
const { upload } = require("../middlewares/s3UploadClient");
const checkAuth = require("../middlewares/checkAuth");
const checkAuthAdmin = require("../middlewares/checkAuthAdmin");

const router = express.Router();

router.post("/addCourse", checkAuthAdmin, courseCntroller.addCourse);

router.post("/getCourses", checkAuth, courseCntroller.getAllCourses);

router.patch("/updateCourse", checkAuthAdmin, courseCntroller.updateCourse);

router.post("/getCourse", checkAuth, courseCntroller.getCourse);

router.delete("/deleteCourse", checkAuthAdmin, courseCntroller.deleteCourse)


module.exports = router;
