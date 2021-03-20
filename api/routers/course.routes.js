const express = require("express");

const courseCntroller = require("../controllers/course.controller");
const { upload } = require("../middlewares/s3UploadClient");
const checkAuth = require("../middlewares/checkAuth");
const checkAuthAdmin = require("../middlewares/checkAuthAdmin");

const router = express.Router();

router.post("/add", checkAuthAdmin, upload.single("image"), courseCntroller.addCourse);

router.get("/all", checkAuth, courseCntroller.getAllCourses);

router.patch("/update", checkAuthAdmin, courseCntroller.updateCourse);

router.get("/one", checkAuth, courseCntroller.getCourse);

router.delete("/delete", checkAuthAdmin, courseCntroller.deleteCourse)

router.post("/enroll",checkAuth, courseCntroller.enroll)
module.exports = router;
