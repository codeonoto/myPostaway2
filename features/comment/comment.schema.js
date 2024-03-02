// IMPORTING MONGOOSE FOR DATABASE CONNECTION
import mongoose from "mongoose";
// DEFINING THE COMMENT SCHEMA STRUCTURE
export const commentSchema = new mongoose.Schema({
    name: String, // NAME OF THE COMMENT AUTHOR
    email: String, // EMAIL OF THE COMMENT AUTHOR
    content: String, // CONTENT OF THE COMMENT
    commentOwnerID: mongoose.Schema.Types.ObjectId, // USER ID OF THE COMMENT AUTHOR
    postID: mongoose.Schema.Types.ObjectId, // ID OF THE POST THE COMMENT BELONGS TO
    postOwnerID: mongoose.Schema.Types.ObjectId, // USER ID OF THE POST OWNER
});