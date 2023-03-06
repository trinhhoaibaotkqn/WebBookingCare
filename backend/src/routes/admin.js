const express = require('express');
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.post("/create-new-user", adminController.createUser);
router.get("/get-user/:role", adminController.getAllUserByRole);
router.patch("/edit-user/:id", adminController.editUser);
router.delete("/delete-user/:id", adminController.deleteUser);
router.get("/get-allcode/:type", adminController.getAllcode);

module.exports = router;