const express = require('express');
const router = express.Router();
const authController = require("../controllers/AuthController");
const {
    verifyAccessToken,
    verifyRefreshToken
} = require("../middlewares/verifyToken");

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', verifyRefreshToken, authController.requestRefreshToken);
router.post('/logout', verifyAccessToken, authController.logout);

module.exports = router;