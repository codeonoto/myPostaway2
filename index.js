//IMPORTING REQURED MODULES AND MIDDLEWARES
import express from "express";
import bodyParser from "body-parser";
import jwtAuthoriser from "./middleware/jwt.middleware.js";
import swagger from 'swagger-ui-express';
import apiDocs from "./swagger.json" assert {type: 'json'};
import { connectToMongoose } from "./configrations/mongoose.config.js";
import { userRouter } from "./features/user/user.route.js";
import { postRouter } from "./features/post/post.route.js";
import { commentRouter } from "./features/comment/comment.route.js";
import { likeRouter } from "./features/like/like.route.js";
import { friendshipRouter } from "./features/friendship/friendship.route.js";
import { otpRouter } from "./features/otp/opt.route.js";
import loggerMiddleware from "./middleware/logger.middleware.js";

// INITIALIZE THE EXPRESS SERVER
const server = express();
// USE BODY-PARSER MIDDLEWARE TO PARSE REQUEST BODIES AS JSON
server.use(bodyParser.json());
// APPLY LOGGER MIDDLEWARE
server.use(loggerMiddleware);

//THIS MIDDLEWARE IS FOR API DOCUMENTATION
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

// ROUTING FOR DIFFERENT FEATURES

// ENDPOINT FOR OTP FUNCTIONALITY
server.use("/api/otp", otpRouter);

// FRIENDSHIP RELATED ENDPOINTS WITH JWT AUTHORIZATION
server.use("/api/friends", jwtAuthoriser, friendshipRouter);

// LIKE RELATED ENDPOINTS WITH JWT AUTHORIZATION
server.use("/api/likes", jwtAuthoriser, likeRouter);

// COMMENT RELATED ENDPOINTS WITH JWT AUTHORIZATION
server.use("/api/comments", jwtAuthoriser, commentRouter);

// POST RELATED ENDPOINTS WITH JWT AUTHORIZATION
server.use("/api/posts", jwtAuthoriser, postRouter);

// USER RELATED ENDPOINTS
server.use("/api/users", userRouter);

// DEFAULT ROUTE
server.get("/", (req, res) => {
    return res.status(200).send("Every Thing is working fine.");
});

// HANDLE ROUTE NOT FOUND
server.use((req, res, next) => {
    return res.status(404).send("API Not Found");
});

// ERROR HANDLING MIDDLEWARE
server.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send("Something Went Wrong Please Try Again Later.");
})

// START THE SERVER
server.listen(5000, () => {
    console.log("The server is listening on port 5000.");
    connectToMongoose();
});