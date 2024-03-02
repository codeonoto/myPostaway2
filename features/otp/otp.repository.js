// IMPORT USER MODEL FROM USER REPOSITORY
import { UserModel } from "../user/user.repositary.js";
// OTP REPOSITORY CLASS
export default class OtpRepository {
    // METHOD TO RESET PASSWORD
    async resetPassword(newPassword, userEmail) {
        try {
            // FIND USER BY EMAIL
            const user = await UserModel.findOne({ email: userEmail });
            // CHECK IF USER EXISTS
            if (!user) {
                return "User Not Found";
            }
            // CREATE A NEW PASSWORD OBJECT
            const newPasswordObj = {
                password: newPassword,
            }
            // UPDATE USER PASSWORD WITH THE NEW PASSWORD
            await UserModel.findOneAndUpdate({ email: userEmail }, newPasswordObj);
            // RETURN SUCCESSFUL PASSWORD RESET MESSAGE
            return "Password Reset Successfuly";
        } catch (err) {
            // THROW ERROR IF FAILED TO RESET PASSWORD
            throw err;
        }
    }
}