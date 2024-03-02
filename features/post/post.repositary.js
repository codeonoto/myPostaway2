// IMPORTING MONGOOSE FOR DATABASE CONNECTION
import mongoose from "mongoose"

// IMPORTING POST SCHEMA
import { postSchema } from "./post.schema.js";

// IMPORTING USER DETAILS FROM JWT MIDDLEWARE
import { loggdInUserID } from "../../middleware/jwt.middleware.js";
import { loggdInUserEmail } from "../../middleware/jwt.middleware.js";
import { loggdInUserName } from "../../middleware/jwt.middleware.js";

// CREATING POST MODEL USING MONGOOSE
export const PostModel = mongoose.model('Post', postSchema);

// POST REPOSITORY CLASS
export default class PostRepositary {
    // METHOD TO CREATE A NEW POST
    async createNewPost(postObj, imageURL) {
        try {
            // CREATING A NEW POST OBJECT WITH USER DETAILS AND CAPTION
            const newPostObj = {
                name: loggdInUserName,
                email: loggdInUserEmail,
                caption: postObj.caption,
                imageURL: imageURL,
                userID: new mongoose.Types.ObjectId(loggdInUserID),
            }
            // CREATING A NEW POST INSTANCE
            const post = new PostModel(newPostObj);
            // SAVING THE NEW POST
            return await post.save();
        } catch (err) {
            // THROWING ERROR IF ENCOUNTERED
            throw err;
        }
    }

    // METHOD TO FETCH ALL POSTS
    async getAllPosts() {
        try {
            // RETURNING ALL POSTS
            return await PostModel.find();
        } catch (err) {
            // THROWING ERROR IF ENCOUNTERED
            throw err;
        }
    }

    // METHOD TO FETCH A POST BY ITS ID
    async getPostById(postId) {
        try {
            // RETURNING A POST BY ITS ID
            return await PostModel.findById(postId);
        } catch (err) {
            // THROWING ERROR IF ENCOUNTERED
            throw err;
        }
    }

    // METHOD TO FETCH POSTS OF A USER
    async getUserPosts() {
        try {
            // RETURNING POSTS OF A USER
            return await PostModel.find({ userID: new mongoose.Types.ObjectId(loggdInUserID) });
        } catch (err) {
            // THROWING ERROR IF ENCOUNTERED
            throw err;
        }
    }

    // METHOD TO DELETE A POST BY ITS ID
    async deletePostById(postId) {
        try {
            // FINDING A POST BY ITS ID
            const post = await PostModel.findById(postId);
            if (!post) {
                // RETURNING IF POST NOT FOUND
                return "Post Not Found";
            }
            if (post.userID != loggdInUserID) {
                // RETURNING IF USER IS NOT LOGGED IN
                return "User Is Not Logged-In";
            }
            // DELETING A POST BY ITS ID
            return await PostModel.findByIdAndDelete(postId);

        } catch (err) {
            // THROWING ERROR IF ENCOUNTERED
            throw err;
        }
    }

    // METHOD TO UPDATE A POST BY ITS ID
    async updatePostById(postId, postObj, imageURL) {
        try {
            // FINDING A POST BY ITS ID
            const post = await PostModel.findById(postId);
            // RETURNING IF POST NOT FOUND
            if (!post) {
                return "Post Not Found";
            }
            // RETURNING IF USER IS NOT LOGGED IN
            if (post.userID != loggdInUserID) {
                return "User Is Not Logged-In";
            }
            // UPDATING IMAGE URL IF PROVIDED
            if (imageURL) {
                postObj.imageURL = imageURL;
            }
            // UPDATING A POST BY ITS ID
            return await PostModel.findByIdAndUpdate(postId, postObj, { new: true });
        } catch (err) {
            // THROWING ERROR IF ENCOUNTERED
            throw err;
        }
    }

}



