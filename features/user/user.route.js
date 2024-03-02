// IMPORTING NECESSARY MODULES
import express from "express";
import { upload } from "../../middleware/fileUpload.middleware.js";
import UserController from "./user.controller.js";
import jwtAuthoriser from "../../middleware/jwt.middleware.js";

// CREATING AN INSTANCE OF THE USERCONTROLLER
const userController = new UserController();

// CREATING A ROUTER USING EXPRESS.JS
export const userRouter = express.Router();

// HANDLING POST REQUESTS FOR USER SIGN-UP
userRouter.post("/signup", userController.signUp);

// HANDLING POST REQUESTS FOR USER SIGN-IN
userRouter.post("/signin", userController.signIn);

// HANDLING GET REQUESTS TO GET DETAILS FOR A SPECIFIC USER BY ID
userRouter.get("/get-details/:userId", jwtAuthoriser, userController.getOneUserDetails);

// HANDLING GET REQUESTS TO GET DETAILS OF ALL USERS
userRouter.get("/get-all-details", jwtAuthoriser, userController.getAllUserDetails);

// HANDLING PUT REQUESTS TO UPDATE DETAILS FOR A SPECIFIC USER BY ID
userRouter.put("/update-details/:userId", upload.single('imageURL'), jwtAuthoriser, userController.updateUserDetails);

// HANDLING GET REQUESTS FOR USER LOGOUT
userRouter.get("/logout", userController.logOut);

// HANDLING GET REQUESTS FOR LOGGING OUT FROM ALL DEVICES
userRouter.get("/logout-all-device", userController.logoutFromEverywhere);