// IMPORTING MONGOOSE FOR DATABASE CONNECTION
import mongoose from "mongoose";
// DEFINING THE POST SCHEMA STRUCTURE
export const postSchema = new mongoose.Schema({
    name: String, // NAME OF THE POST OWNER
    email: String, // EMAIL OF THE POST OWNER
    caption: String, // CAPTION OF THE POST
    imageURL: String, // URL OF THE IMAGE ASSOCIATED WITH THE POST
    userID: mongoose.Schema.Types.ObjectId // USER ID OF THE POST OWNER
});