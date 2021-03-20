const express = require("express");

const lessonController = require("../controllers/lesson.controller");

const checkAuth = require("../middlewares/checkAuth");
const checkAuthAdmin = require("../middlewares/checkAuthAdmin");
const lesson = require("../models/lesson");

const router = express.Router();

router.post("/addLesson", checkAuth, lessonController.addLesson);

router.post("/addLessonWithoutVideo", checkAuth, lessonController.addLessonWithoutVideo);

router.patch("/updateLesson", checkAuth, lessonController.updateLesson);

router.get("/getLesson", checkAuth, lessonController.getLesson);

router.post(
  "/checkEnrolled",
  checkAuth,
  lessonController.checkEnrolled
);

router.delete("/deleteLesson", checkAuthAdmin, lessonController.deleteLesson)


module.exports = router;
