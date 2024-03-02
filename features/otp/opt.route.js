// IMPORT EXPRESS MODULE
import express from "express";
// IMPORT OTP CONTROLLER
import OtpController from "./otp.controller.js";
// CREATE AN INSTANCE OF OtpController
const otpController = new OtpController();
// CREATE A ROUTER FOR OTP
export const otpRouter = express.Router();
// ROUTE TO SEND OTP
otpRouter.post("/send", otpController.sendOtp);
// ROUTE TO VERIFY OTP
otpRouter.post("/verify", otpController.verifyOtp);
// ROUTE TO RESET PASSWORD USING OTP
otpRouter.post("/reset-password", otpController.resetPassword);