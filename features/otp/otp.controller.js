// IMPORT OTP REPOSITORY
import OtpRepository from "./otp.repository.js";
// IMPORT OTP EMAIL CONFIGURATIONS
import OtpEmail from "../../configrations/email.config.js";
// CREATE AN INSTANCE OF OtpEmail
const otpEmail = new OtpEmail();
// CREATE AN INSTANCE OF OtpRepository
const otpRepository = new OtpRepository();
// VARIABLES TO STORE OTP, VERIFICATION STATUS, AND USER EMAIL
let otp;
let verify;
let userEmail;

// OTP CONTROLLER CLASS
export default class OtpController {
    // METHOD TO SEND OTP
    sendOtp(req, res) {
        try {
            // GET USER EMAIL FROM REQUEST BODY
            userEmail = req.body.email;
            // GENERATE RANDOM OTP
            otp = Math.floor(100000 + Math.random() * 900000);
            // SEND OTP TO USER'S EMAIL
            otpEmail.sendOtp(userEmail, otp);
            // RETURN SUCCESS RESPONSE
            return res.status(200).send(`An OTP Has Been Sent To ${userEmail}\nWait For Atleast 2 Mins Before Retrying`);
        } catch (err) {
            // RETURN ERROR IF FAILED TO SEND OTP
            return res.status(500).send("Failed To Send OTP");
        }
    }

    // METHOD TO VERIFY OTP
    verifyOtp(req, res) {
        try {
            // CHECK IF ENTERED OTP MATCHES GENERATED OTP
            if (otp == req.body.otp) {
                verify = true;
                return res.status(200).send("OTP Verifyed Successfuly");
            } else {
                verify = false;
                return res.status(400).send("OTP Did Not Match Please Try Again");
            }
        } catch (err) {
            // RETURN ERROR IF FAILED TO VERIFY OTP
            return res.status(500).send("Failed To Verify OTP");
        }

    }

    // METHOD TO RESET PASSWORD
    async resetPassword(req, res) {
        try {
            // GET NEW PASSWORD FROM REQUEST BODY
            const newPassword = req.body.newPassword;
            // CHECK IF OTP IS VERIFIED
            if (verify) {
                // RESET PASSWORD FOR THE USER
                const result = await otpRepository.resetPassword(newPassword, userEmail);
                // CHECK IF USER IS FOUND OR NOT
                if (result == "User Not Found") {
                    return res.status(404).send("User Not Found");
                }
                // RETURN SUCCESS RESPONSE FOR PASSWORD RESET
                otp = null;
                verify = null;
                userEmail = null;
                return res.status(201).send(result);
            } else {
                // RETURN ERROR IF OTP IS NOT VERIFIED
                return res.status(400).send("OTP Did Not Match Please Try Again");
            }
        } catch (err) {
            // RETURN ERROR IF FAILED TO RESET PASSWORD
            return res.status(500).send("Failed To Reset Password");
        }
    }
}