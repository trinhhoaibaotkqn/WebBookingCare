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

module.exports = router;