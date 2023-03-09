const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserController");


router.get('/get-top-doctor-home/:limit', userController.getTopDoctorHome);


module.exports = router;