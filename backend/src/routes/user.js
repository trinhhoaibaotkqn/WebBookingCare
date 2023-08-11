const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserController");
const {
    verifyTokenAndPatientAuthor
} = require("../middlewares/verifyToken");

router.get('/get-top-doctor-home/:limit', userController.getTopDoctorHome);
router.get('/get-top-clinic', userController.getTopClinic);
router.get('/get-top-specialty', userController.getTopSpecialty);
// router.get('/get-detail-doctor/:id', userController.getDetailDoctor);
router.get('/get-schedule-doctor', userController.getScheduleDoctor);
router.get('/get-doctor-info-price-address-clinic/:id', userController.getDoctorInfoPriceAddressClinic);
router.post('/book-appointment', verifyTokenAndPatientAuthor, userController.bookAppointment);
router.post('/verify-booking-appointment', userController.verifyBookingAppointment);
router.get('/get-all-specialty', userController.getAllSpecialty);
router.get('/get-all-clinic', userController.getAllClinic);
router.get('/get-all-doctor-by-specialty/:specialtyId', userController.getAllDoctorBySpecialty);
router.get('/get-all-doctor-by-clinic/:clinicId', userController.getAllDoctorByClinic);
module.exports = router;