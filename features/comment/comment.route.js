// IMPORTING THE COMMENT CONTROLLER
import CommentController from "./comment.controller.js";
// IMPORTING EXPRESS FOR ROUTING
import express from "express";
// CREATING AN INSTANCE OF THE COMMENT CONTROLLER
const commentConroller = new CommentController();
// CREATING A ROUTER USING EXPRESS
export const commentRouter = express.Router();

// HANDLING POST REQUEST TO ADD A NEW COMMENT TO A SPECIFIC POST
commentRouter.post("/:postId", commentConroller.addNewComment);

// HANDLING GET REQUEST TO RETRIEVE COMMENTS BY POST ID
commentRouter.get("/:postId", commentConroller.getCommentsByPostId);

// HANDLING DELETE REQUEST TO DELETE A COMMENT BY COMMENT ID
commentRouter.delete("/:commentId", commentConroller.deleteCommentById);

// HANDLING PUT REQUEST TO UPDATE A COMMENT BY COMMENT ID
commentRouter.put("/:commentId", commentConroller.updateCommentById);