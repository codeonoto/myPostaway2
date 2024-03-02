//THIS FILE IS HANDLING ALL THE USER DATABASE RELATED OPERATIONS

//IMPORTING ALL THE REQUIRED MODULES 
import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { loggdInUserID } from "../../middleware/jwt.middleware.js";
//MODEL OF USER USERSCEMA
export const UserModel = mongoose.model('User', userSchema);

export default class UserRepository {
    //THIS FUNCTION ADD THE NEW USER TO THE SERVER
    async addNewUser(userObj) {
        try {
            const isUserExists = await UserModel.exists({ email: userObj.email });//CHECKING IF THE USER ALREADY EXISTS
            if (isUserExists) {
                return "Email Already Exists"; //IF USER ALREADY EXISTS 
            } else {
                const newUser = new UserModel(userObj);
                await newUser.save(); //ADDING THE USER TO THE SERVER
                return newUser;
            }
        } catch (err) {
            // HANDLING UNEXPECTED ERRORS IN TRY BLOCK
            throw err;
        }
    }

    //THIS FUNCTION CHECKS IF USER WITH GIVEN CREDENTIALS IS PRESENT OR NOT 
    async confirmUser(userObj) {
        try {
            //SERCHING FOR THE USER
            return await UserModel.findOne({ email: userObj.email, password: userObj.password });
        } catch (err) {
            // HANDLING UNEXPECTED ERRORS IN TRY BLOCK
            throw err;
        }
    }

    //THIS FUNCTION TAKES THE USER ID AS PARAMETER AND FETCHED THE USER WITH GIVEN USER ID 
    async getOneUserDetails(userId) {
        try {
            return await UserModel.findById(userId).select('-password -_id -__v');//IF USER FOUND
        } catch (err) {
            // HANDLING UNEXPECTED ERRORS IN TRY BLOCK
            throw err;
        }
    }

    //THIS FUNCTION RETURNS THE ALL THE USERS AVAILABLE ON THE SERVER
    async getAllUserDetails() {
        try {
            return await UserModel.find().select('-password -_id -__v'); //RETURNING ALL THE USERS
        } catch (err) {
            // HANDLING UNEXPECTED ERRORS IN TRY BLOCK
            throw err;
        }
    }

    //THIS FUNCTION UPDATES THE DETAILS OF OF THE USER WITH GIVEN ID
    async updateUserDetails(userId, userObj) {
        try {
            const user = await UserModel.findById(userId);//CHECKING IF THE USER EXIST OR NOT
            if (!user) {
                return "User Not Found"; //IN CASE USER NOT FOUND 
            }
            if (loggdInUserID != userId) {
                return "User Is Not Logged-In";// IN CASE USER IS NOT LOGGED IN
            }
            //UPDATING THE DETAILS OF THE USER
            return await UserModel.findByIdAndUpdate(userId, userObj, { new: true }).select('-password -_id -__v');
        } catch (err) {
            // HANDLING UNEXPECTED ERRORS IN TRY BLOCK
            throw err;
        }

    }
}











