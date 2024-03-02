// IMPORTING COMMENTREPOSITORY MODULE
import CommentRepository from "./comment.repository.js";

// CREATING AN INSTANCE OF COMMENTREPOSITORY
const commentRepository = new CommentRepository();

// COMMENTCONTROLLER CLASS
export default class CommentController {
    // METHOD TO ADD A NEW COMMENT TO A POST
    async addNewComment(req, res) {
        try {
            // EXTRACTING POST ID FROM REQUEST PARAMETERS
            const postId = req.params.postId;
            // ADDING A NEW COMMENT
            const comment = await commentRepository.addNewComment(req.body, postId);
            // RETURNING IF POST NOT FOUND
            if (comment == "Post Not Found") {
                return res.status(404).send("Post Not Found");
            }
            // RETURNING THE NEWLY ADDED COMMENT
            return res.status(201).send(comment);
        } catch (err) {
            // ERROR IF FAILED TO ADD COMMENT
            return res.status(500).send("Failed To Add Comment");
        }
    }

    // METHOD TO GET COMMENTS BY POST ID
    async getCommentsByPostId(req, res) {
        try {
            // EXTRACTING POST ID FROM REQUEST PARAMETERS
            const postId = req.params.postId;
            // GETTING COMMENTS BY POST ID
            const comments = await commentRepository.getCommentsByPostId(postId);
            // RETURNING IF NO COMMENTS FOUND
            if (comments.length == 0) {
                return res.status(404).send("Comments Not Found");
            }
            // RETURNING THE COMMENTS
            return res.status(200).send(comments);
        } catch (err) {
            // ERROR IF FAILED TO FETCH COMMENTS
            return res.status(500).send("Failed To Fetch Comments");
        }
    }

    // METHOD TO DELETE A COMMENT BY COMMENT ID
    async deleteCommentById(req, res) {
        try {
            // EXTRACTING COMMENT ID FROM REQUEST PARAMETERS
            const commentId = req.params.commentId;
            // DELETING A COMMENT BY COMMENT ID
            const comment = await commentRepository.deleteCommentById(commentId);
            // RETURNING IF COMMENT NOT FOUND
            if (comment == "Comment Not Found") {
                return res.status(404).send("Comment Not Found");
            }
            // RETURNING IF USER NOT AUTHORIZED TO DELETE
            if (comment == "User Is Not Logged-In") {
                return res.status(403).send("Only Post Owner And Comment Owner Can Delete The Comment");
            }
            // RETURNING ON SUCCESSFUL DELETION
            return res.status(204).send(comment);
        } catch (err) {
            // ERROR IF FAILED TO DELETE COMMENT
            return res.status(500).send("Failed To Delete Comment");
        }
    }

    // METHOD TO UPDATE A COMMENT BY COMMENT ID
    async updateCommentById(req, res) {
        try {
            // EXTRACTING COMMENT ID FROM REQUEST PARAMETERS
            const commentId = req.params.commentId;
            // UPDATING A COMMENT BY COMMENT ID
            const comment = await commentRepository.updateCommentById(commentId, req.body);
            // RETURNING IF COMMENT NOT FOUND
            if (comment == "Comment Not Found") {
                return res.status(404).send("Comment Not Found");
            }
            // RETURNING IF USER NOT AUTHORIZED TO UPDATE
            if (comment == "User Is Not Logged-In") {
                return res.status(403).send("Only Post Owner And Comment Owner Can Update The Comment");
            }
            // RETURNING ON SUCCESSFUL UPDATE
            return res.status(201).send(comment);
        } catch (err) {
            // ERROR IF FAILED TO UPDATE COMMENT
            return res.status(500).send("Failed To Update Comment");
        }

    }
}