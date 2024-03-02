// IMPORTING MONGOOSE FOR DATABASE CONNECTION
import mongoose from "mongoose";
// DEFINING THE USER SCHEMA STRUCTURE
export const userSchema = new mongoose.Schema({
    name: String,  // NAME OF THE USER
    email: { type: String, required: true }, // EMAIL OF THE USER (REQUIRED FIELD)
    password: { type: String, required: true },  // PASSWORD OF THE USER (REQUIRED FIELD)
    gender: String, // GENDER OF THE USER
    imageURL: String // URL OF THE USER'S PROFILE IMAGE

});