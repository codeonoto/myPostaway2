// IMPORTING MONGOOSE FOR DATABASE CONNECTION
import mongoose from "mongoose"

// IMPORTING COMMENTSCHEMA
import { commentSchema } from "./comment.schema.js";
// CREATING COMMENT MODEL USING MONGOOSE
export const CommentModel = mongoose.model('Comment', commentSchema);

// IMPORTING USER DETAILS FROM JWT MIDDLEWARE
import { loggdInUserID } from "../../middleware/jwt.middleware.js";
import { loggdInUserName } from "../../middleware/jwt.middleware.js";
import { loggdInUserEmail } from "../../middleware/jwt.middleware.js";

// IMPORTING POSTMODEL FROM POST REPOSITORY
import { PostModel } from "../post/post.repositary.js";

// COMMENTREPOSITORY CLASS
export default class CommentRepository {
    // METHOD TO ADD A NEW COMMENT TO A POST
    async addNewComment(commentObj, postId) {
        try {
            // FINDING POST BY ID
            const post = await PostModel.findById(postId);
            // RETURNING IF POST NOT FOUND
            if (!post) {
                return "Post Not Found";
            }
            const newCommentObj = {
                content: commentObj.content, // CONTENT OF THE COMMENT
                commentOwnerID: loggdInUserID, // USER ID OF THE COMMENT OWNER
                postID: postId, // POST ID ASSOCIATED WITH THE COMMENT
                postOwnerID: post.userID, // USER ID OF THE POST OWNER
                name: loggdInUserName, // NAME OF THE COMMENT OWNER
                email: loggdInUserEmail // EMAIL OF THE COMMENT OWNER
            }
            // CREATING NEW COMMENT INSTANCE
            const comment = new CommentModel(newCommentObj);
            // SAVING THE NEW COMMENT
            return await comment.save();
        } catch (err) {
            // THROWING ERROR IF ENCOUNTERED
            throw err;
        }
    }

    // METHOD TO GET COMMENTS BY POST ID
    async getCommentsByPostId(postId) {
        try {
            // FINDING COMMENTS BY POST ID
            return await CommentModel.find({ postID: postId });
        } catch (err) {
            // THROWING ERROR IF ENCOUNTERED
            throw err;
        }
    }

    // METHOD TO DELETE A COMMENT BY COMMENT ID
    async deleteCommentById(commentId) {
        try {
            // FINDING COMMENT BY ID
            const comment = await CommentModel.findById(commentId);
            // RETURNING IF COMMENT NOT FOUND
            if (!comment) {
                return "Comment Not Found";
            }
            const commentOwner = comment.commentOwnerID;
            const postOwner = comment.postOwnerID;
            const currentUser = new mongoose.Types.ObjectId(loggdInUserID);
            // DELETING COMMENT BY ID IF AUTHORIZED
            if (currentUser.equals(commentOwner) || currentUser.equals(postOwner)) {
                return await CommentModel.findByIdAndDelete(commentId);
            } else {
                // RETURNING IF USER NOT AUTHORIZED
                return "User Is Not Logged-In";
            }
        } catch (err) {
            // THROWING ERROR IF ENCOUNTERED
            throw err;
        }
    }

    // METHOD TO UPDATE A COMMENT BY COMMENT ID
    async updateCommentById(commentId, commentObj) {
        try {
            // FINDING COMMENT BY ID
            const comment = await CommentModel.findById(commentId);
            // RETURNING IF COMMENT NOT FOUND
            if (!comment) {
                return "Comment Not Found";
            }
            const commentOwner = comment.commentOwnerID;
            const postOwner = comment.postOwnerID;
            const currentUser = new mongoose.Types.ObjectId(loggdInUserID);
            // UPDATING COMMENT BY ID IF AUTHORIZED
            if (currentUser.equals(commentOwner) || currentUser.equals(postOwner)) {
                return await CommentModel.findByIdAndUpdate(commentId, { content: commentObj.content }, { new: true });
            } else {
                // RETURNING IF USER NOT AUTHORIZED
                return "User Is Not Logged-In";
            }
        } catch (err) {
            // THROWING ERROR IF ENCOUNTERED
            throw err;
        }
    }

}