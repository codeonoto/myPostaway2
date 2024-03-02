// IMPORTING NECESSARY MODULES
import express from "express";

// IMPORTING THE FILE UPLOAD MIDDLEWARE
import { upload } from "../../middleware/fileUpload.middleware.js";

// IMPORTING THE POSTCONTROLLER
import PostController from "./post.controller.js";

// CREATING AN INSTANCE OF THE POSTCONTROLLER
const postController = new PostController();

// CREATING A ROUTER USING EXPRESS.JS
export const postRouter = express.Router();

// HANDLING POST REQUESTS TO CREATE A NEW POST
postRouter.post("/", upload.single('imageURL'), postController.createNewPost);

// HANDLING GET REQUESTS TO FETCH ALL POSTS
postRouter.get("/all", postController.getAllPosts);

// HANDLING GET REQUESTS TO FETCH A POST BY ITS ID
postRouter.get("/:postId", postController.getPostById);

// HANDLING GET REQUESTS TO FETCH POSTS FOR logged-in USER
postRouter.get("/", postController.getUserPosts);

// HANDLING DELETE REQUESTS TO DELETE A POST BY ITS ID
postRouter.delete("/:postId", postController.deletePostById);

// HANDLING PUT REQUESTS TO UPDATE A POST BY ITS ID
postRouter.put("/:postId", upload.single('imageURL'), postController.updatePostById);