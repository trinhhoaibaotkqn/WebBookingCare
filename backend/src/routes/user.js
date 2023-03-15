const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserController");


router.get('/get-top-doctor-home/:limit', userController.getTopDoctorHome);
router.get('/get-detail-doctor/:id', userController.getDetailDoctor);
router.get('/get-schedule-doctor', userController.getScheduleDoctor);

module.exports = router;