// IMPORTING EXPRESS FOR ROUTING
import express from "express";
import FriendshipController from "./friendship.controller.js";

// INSTANTIATING THE FRIENDSHIP CONTROLLER
const friendshipController = new FriendshipController();
// CREATING A NEW EXPRESS ROUTER
export const friendshipRouter = express.Router();

// ENDPOINT TO TOGGLE FRIENDSHIP STATUS BETWEEN USERS BASED ON friendId
friendshipRouter.get("/toggle-friendship/:friendId", friendshipController.toggleFriendship);

// ENDPOINT TO RETRIEVE PENDING FRIEND REQUESTS
friendshipRouter.get("/get-pending-requests", friendshipController.getPendingFriendRequest);

// ENDPOINT TO RESPOND TO A FRIEND REQUEST BASED ON friendId
friendshipRouter.get("/response-to-request/:friendId", friendshipController.responseToFriendRequest);

// ENDPOINT TO RETRIEVE THE FRIEND LIST OF A SPECIFIC USER BASED ON userId
friendshipRouter.get("/get-friends/:userId", friendshipController.getUserFriendList);
