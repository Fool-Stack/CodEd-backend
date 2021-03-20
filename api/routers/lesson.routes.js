const express = require("express");

const lessonController = require("../controllers/lesson.controller");
const { upload } = require("../middlewares/s3UploadClient");
const checkAuth = require("../middlewares/checkAuth");
const checkAuthAdmin = require("../middlewares/checkAuthAdmin");

const router = express.Router();

router.post("/add", checkAuthAdmin, upload.single('video'), lessonController.addLesson);

router.post("/addLessonWithoutVideo", checkAuthAdmin, lessonController.addLessonWithoutVideo);

router.patch("/update", checkAuthAdmin, lessonController.updateLesson);

router.post("/get", checkAuth, lessonController.getLesson);

router.post(
  "/checkEnrolled",
  checkAuth,
  lessonController.checkEnrolled
);

router.delete("/deleteLesson", checkAuthAdmin, lessonController.deleteLesson)


module.exports = router;
