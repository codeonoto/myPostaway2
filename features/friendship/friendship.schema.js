// IMPORTING MONGOOSE FOR DATABASE CONNECTION
import mongoose from "mongoose";

// DEFINING A FRIENDSHIP SCHEMA USING MONGOOSE
export const friendshipSchema = new mongoose.Schema({
    // FRIEND DETAILS
    friendName: String,
    friendGender: String,
    friendEmail: String,
    friendProfileImg: String,
    friendUserId: mongoose.Schema.Types.ObjectId,

    // REQUESTER DETAILS
    requesterName: String,
    requesterGender: String,
    requesterEmail: String,
    requesterProfileImg: String,
    requesterUserID: mongoose.Schema.Types.ObjectId,

    //STATUS OF THE FRIENDSHIP
    userID: mongoose.Schema.Types.ObjectId,
    //USER ID OF THE USER
    status: String,


});