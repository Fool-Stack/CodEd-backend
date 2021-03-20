const express = require("express");

const lessonController = require("../controllers/lesson.controller");
const { upload } = require("../middlewares/s3UploadClient");
const checkAuth = require("../middlewares/checkAuth");
const checkAuthAdmin = require("../middlewares/checkAuthAdmin");
const code = require('../controllers/code')
const router = express.Router();

router.post("/add", checkAuthAdmin, upload.single('video'), lessonController.addLesson);

router.post("/withoutVideo", checkAuthAdmin, lessonController.addLessonWithoutVideo);

router.patch("/update", checkAuthAdmin, lessonController.updateLesson);

router.get("/get", checkAuth, lessonController.getLesson);

router.get("/all",checkAuth,lessonController.getAllLessons)
router.post(
  "/checkEnrolled",
  checkAuth,
  lessonController.checkEnrolled
);

router.post('/addVideo', checkAuthAdmin, upload.single('video'), lessonController.addVideo);

router.delete("/deleteLesson", checkAuthAdmin, lessonController.deleteLesson)

router.post("/code",checkAuth,code.submit )

router.post('/token',checkAuth,code.getToken)

router.post('/output',checkAuth,code.getOuput)

module.exports = router;
