const express = require('express');
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.post("/create-new-user", adminController.createUser);
router.get("/get-user/:role", adminController.getAllUserByRole);
router.patch("/edit-user/:id", adminController.editUser);
router.delete("/delete-user/:id", adminController.deleteUser);
router.get("/get-code/:type", adminController.getCode);
router.post("/save-info-doctor", adminController.saveInfoDoctor);
router.get("/get-info-doctor/:doctorId", adminController.getInfoDoctor);
router.post("/create-new-specialty", adminController.createSpecialty);
router.get("/get-list-specialty", adminController.getAllSpecialty);
router.get("/get-list-name-specialty", adminController.getListNameSpecialty);
router.get("/get-list-name-clinic", adminController.getListNameClinic);
router.patch("/edit-specialty/:id", adminController.editSpecialty);
router.delete("/delete-specialty/:id", adminController.deleteSpecialty);
router.post("/create-new-clinic", adminController.createClinic);
router.get("/get-list-clinic", adminController.getAllClinic);
router.patch("/edit-clinic/:id", adminController.editClinic);
router.delete("/delete-clinic/:id", adminController.deleteClinic);

module.exports = router;