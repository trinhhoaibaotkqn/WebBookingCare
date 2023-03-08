const express = require('express');
const router = express.Router();
const commonController = require("../controllers/CommonController");

router.get("/get-allcode/:type", commonController.getAllcode);

module.exports = router;