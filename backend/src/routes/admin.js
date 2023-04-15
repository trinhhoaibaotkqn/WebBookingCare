const express = require('express');
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.post("/create-new-user", adminController.createUser);
router.get("/get-user/:role", adminController.getAllUserByRole);
router.patch("/edit-user/:id", adminController.editUser);
router.delete("/delete-user/:id", adminController.deleteUser);
router.get("/get-role", adminController.getRole);
router.post("/save-info-doctor", adminController.saveInfoDoctor);
router.get("/get-info-doctor/:doctorId", adminController.getInfoDoctor);
router.post("/create-new-specialty", adminController.createSpecialty);
router.get("/get-list-specialty", adminController.getAllSpecialty);
router.patch("/edit-specialty/:id", adminController.editSpecialty);
router.delete("/delete-specialty/:id", adminController.deleteSpecialty);
router.post("/create-new-clinic", adminController.createClinic);
router.get("/get-list-clinic", adminController.getAllClinic);
router.patch("/edit-clinic/:id", adminController.editClinic);
router.delete("/delete-clinic/:id", adminController.deleteClinic);

module.exports = router;