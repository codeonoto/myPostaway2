// IMPORTING MONGOOSE AND REQUIRED SCHEMAS AND MIDDLEWARE
import mongoose from "mongoose"
import { likeSchema } from "./like.schema.js";
import { loggdInUserID } from "../../middleware/jwt.middleware.js";
import { loggdInUserName } from "../../middleware/jwt.middleware.js";
import { loggdInUserEmail } from "../../middleware/jwt.middleware.js";
import { CommentModel } from "../comment/comment.repository.js";
import { PostModel } from "../post/post.repositary.js";

// CREATING LIKE MODEL
const LikeModel = mongoose.model('Like', likeSchema);

// LIKE REPOSITORY CLASS
export default class LikeRepository {

    // METHOD TO GET LIKE BY ID
    async getLikeById(id) {
        try {
            // FIND LIKE BASED ON COMMENT OR POST ID
            return await LikeModel.find({ $or: [{ commentID: new mongoose.Types.ObjectId(id) }, { postID: new mongoose.Types.ObjectId(id) }] });

        } catch (err) {
            throw err;
        }
    }

    // METHOD TO TOGGLE LIKE ON POST
    async postLiketoggle(id) {
        try {
            // FIND POST BY ID
            const post = await PostModel.findById(id);
            // IF POST DOES NOT EXIST
            if (!post) {
                return "Data Not Found";
            }
            //CHECKING IG THE POST IS ALREADY LIKED OR NOT
            const result = await LikeModel.findOne({ postID: id, userID: new mongoose.Types.ObjectId(loggdInUserID) });
            //IF POST IS NOT ALREADY LIKED
            if (!result) {
                const likeObj = {
                    name: loggdInUserName,
                    email: loggdInUserEmail,
                    userID: new mongoose.Types.ObjectId(loggdInUserID),
                    postID: new mongoose.Types.ObjectId(id),
                    type: "Post"
                }
                const like = new LikeModel(likeObj);
                await like.save();
                return "Post Liked";
            } else {
                // CHECK IF USER ALREADY LIKED THE POST
                await LikeModel.findOneAndDelete({ postID: id, userID: new mongoose.Types.ObjectId(loggdInUserID) });
                return "Post Unliked";
            }
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS IN TRY BLOCK
            throw err;
        }
    }
    // METHOD TO TOGGLE LIKE ON COMMENT
    async commentLiketoggle(id) {
        try {
            // FIND COMMENT BY ID
            const comment = await CommentModel.findById(id);
            //IF COMMENT NOT FOUND
            if (!comment) {
                return "Data Not Found";
            }
            //CHECKING IF THE COMMENT IS ALRAEDY LIKED OR NOT 
            const result = await LikeModel.findOne({ commentID: id, userID: new mongoose.Types.ObjectId(loggdInUserID) });
            //IF THE COMMENT IS NOT ALREADY LIKED THEN LIKE THE COMMENT
            if (!result) {
                const likeObj = {
                    name: loggdInUserName,
                    email: loggdInUserEmail,
                    userID: new mongoose.Types.ObjectId(loggdInUserID),
                    commentID: new mongoose.Types.ObjectId(id),
                    type: "Comment"
                }
                const like = new LikeModel(likeObj);
                await like.save();
                return "Comment Liked";
            } else {
                //UNLIKE THE COMMENT IF THE COMMENT IS ALREADY LIKED 
                await LikeModel.findOneAndDelete({ commentID: id, userID: new mongoose.Types.ObjectId(loggdInUserID) });
                return "Comment Unliked";
            }
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS 
            throw err;
        }
    }
}