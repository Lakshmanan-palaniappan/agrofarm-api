const express = require('express');
const userController = require('./otpService');

const router = express.Router();

router.post('/otp-login', userController.otpLogin);  // Send OTP
router.post('/verify-otp', userController.verifyOtp);  // Verify OTP

module.exports = router;
