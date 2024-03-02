// IMPORTING EXPRESS FOR ROUTING
import express from "express";

// IMPORTING LIKECONTROLLER MODULE
import LikeController from "./like.controller.js";

// CREATING A ROUTER USING EXPRESS
export const likeRouter = express.Router();

// CREATING AN INSTANCE OF LIKECONTROLLER
const likeConroller = new LikeController();

// HANDLING GET REQUEST TO RETRIEVE LIKE BY ID
likeRouter.get("/:id", likeConroller.getLikeById);
// HANDLING GET REQUEST TO TOGGLE A LIKE
likeRouter.get("/toggle/:id", likeConroller.toggleLike);
