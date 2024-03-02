// IMPORT NODMAILER LIBRARY FOR SENDING EMAILS
import nodemailer from 'nodemailer';

// OTP EMAIL CLASS
export default class OtpEmail {
    // ASYNCHRONOUS FUNCTION TO SEND OTP VIA EMAIL
    async sendOtp(userEmail, otp) {

        // CREATE AN EMAIL TRANSPORTER USING GMAIL SERVICE
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'Enter you email here', //GMAIL ACCOUNT
                pass: 'Enter your password here', //GMAIL PASSWORD
            },
        });
        // CONFIGURE EMAIL CONTENT (MAIL OPTIONS)
        const mailOptions = {
            from: 'Enter you email here', // SENDER EMAIL
            to: userEmail, // RECIPIENT EMAIL
            subject: `Postaway 2 | Reset Password OTP`, // EMAIL SUBJECT
            // EMAIL CONTENT
            text: `Dear Postaway Member \nHere is your OTP for changing password ${otp}\nDo not share OTP with anyone. \nThank you \nRegards - Akash Verma (Auther of the portal). `,
        };
        // SEND THE EMAIL
        try {
            await transporter.sendMail(mailOptions); // ATTEMPT TO SEND EMAIL
        } catch (err) {
            throw err; // THROW ERROR
        };
    }

}
