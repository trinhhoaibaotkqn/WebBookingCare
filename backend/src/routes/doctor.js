const express = require('express');
const router = express.Router();
const doctorController = require("../controllers/DoctorController");

router.get("/get-allcode/:type", doctorController.getAllcode);
router.get("/get-schedule", doctorController.getSchedule);
router.post("/save-schedule", doctorController.saveSchedule);

module.exports = router;