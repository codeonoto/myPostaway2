// IMPORTING MONGOOSE FOR DATABASE CONNECTION
import mongoose from "mongoose";
// DEFINING A LIKE SCHEMA USING MONGOOSE
export const likeSchema = new mongoose.Schema({
    // DETAILS OF THE USER LIKING
    name: String,
    email: String,
    userID: mongoose.Schema.Types.ObjectId,
    // IDENTIFIERS FOR THE POST OR COMMENT LIKED
    postID: mongoose.Schema.Types.ObjectId,
    commentID: mongoose.Schema.Types.ObjectId,
    // TYPE OF THE LIKED ITEM (POST OR COMMENT)
    type: String
});