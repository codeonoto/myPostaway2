// IMPORTING POSTREPOSITORY MODULE
import PostRepositary from "./post.repositary.js";
// INSTANTIATING POSTREPOSITORY
const postRepositary = new PostRepositary();

export default class PostController {
    // HANDLES CREATING A NEW POST
    async createNewPost(req, res) {
        try {
            // GETTING IMAGE URL FROM REQUEST
            const imageURL = req.file.filename;
            // CREATING A NEW POST
            const post = await postRepositary.createNewPost(req.body, imageURL);
            // RETURNING THE NEWLY CREATED POST
            return res.status(201).send(post);
        } catch (err) {
            // ERROR IF FAILED TO CREATE POST
            return res.status(500).send("Failed To Create Post");
        }
    }

    // HANDLES GETTING ALL POSTS
    async getAllPosts(req, res) {
        try {
            // FETCHING ALL POSTS
            const posts = await postRepositary.getAllPosts();

            if (posts.length == 0) { // IF NO POSTS FOUND
                return res.status(404).send("Posts Not Found");
            } else { // SENDING ALL POSTS
                return res.status(200).send(posts);
            }

        } catch (err) {
            // ERROR IF FAILED TO FETCH POSTS
            return res.status(500).send("Failed To Fetch Posts");
        }
    }

    // HANDLES GETTING A POST BY ID
    async getPostById(req, res) {
        try {
            // GETTING POST ID FROM REQUEST PARAMETERS
            const postId = req.params.postId;
            // FETCHING A POST BY ID
            const post = await postRepositary.getPostById(postId);
            if (!post) { // IF POST NOT FOUND
                return res.status(404).send("Post Not Found");
            } else { // SENDING THE POST
                return res.status(200).send(post);
            }

        } catch (err) {
            // ERROR IF FAILED TO FETCH POST
            return res.status(500).send("Failed To Fetch Post");
        }
    }

    // HANDLES GETTING POSTS OF A USER
    async getUserPosts(req, res) {
        try {
            // FETCHING POSTS OF A USER
            const posts = await postRepositary.getUserPosts();
            if (posts.length == 0) {
                // IF NO POSTS FOUND FOR THE USER
                return res.status(404).send("Posts Not Found");
            } else {
                // SENDING THE USER'S POSTS
                return res.status(200).send(posts);
            }
        } catch (err) {
            // ERROR IF FAILED TO FETCH USER'S POSTS
            return res.status(500).send("Failed To Fetch Posts");
        }
    }
    // HANDLES DELETING A POST BY ID
    async deletePostById(req, res) {
        try {
            // GETTING POST ID FROM REQUEST PARAMETERS
            const postId = req.params.postId;
            // DELETING A POST BY ID
            const post = await postRepositary.deletePostById(postId);
            if (post == "Post Not Found") { // IF POST NOT FOUND
                return res.status(404).send("Post Not Found");
            }
            if (post == "User Is Not Logged-In") { // IF USER NOT AUTHORIZED TO DELETE
                return res.status(403).send("Not Allowed To Delete Someone Else's Post");
            }
            // RETURNING ON SUCCESSFUL DELETION
            return res.status(204).send(post);
        } catch (err) { // ERROR IF FAILED TO DELETE POST
            return res.status(500).send("Failed To Delete Post");
        }
    }

    // HANDLES UPDATING A POST BY ID
    async updatePostById(req, res) {
        try {
            // GETTING POST ID FROM REQUEST PARAMETERS
            const postId = req.params.postId;
            // GETTING IMAGE URL FROM REQUEST
            const imageURL = req.file.filename;
            const postObj = {
                // UPDATING POST CAPTION
                caption: req.body.caption,
            };
            // UPDATING A POST BY ID
            const post = await postRepositary.updatePostById(postId, postObj, imageURL);
            if (post == "Post Not Found") { // IF POST NOT FOUND
                return res.status(404).send("Post Not Found");
            }
            if (post == "User Is Not Logged-In") { // IF USER NOT AUTHORIZED TO UPDATE
                return res.status(403).send("Not Allowed To Update Someone Else's Post");
            }
            // RETURNING ON SUCCESSFUL UPDATE
            return res.status(201).send(post);
        } catch (err) {
            // ERROR IF FAILED TO UPDATE POST
            return res.status(500).send("Failed To Update Post");
        }
    }

}