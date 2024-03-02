// IMPORTING LIKEREPOSITORY MODULE
import LikeRepository from "./like.repository.js";

// CREATING AN INSTANCE OF LIKEREPOSITORY
const likeRepository = new LikeRepository();

// LIKECONTROLLER CLASS
export default class LikeController {
    // METHOD TO GET LIKE BY ID
    async getLikeById(req, res) {
        try {
            // EXTRACTING ID FROM REQUEST PARAMETERS
            const id = req.params.id;
            // GETTING LIKE BY ID
            const result = await likeRepository.getLikeById(id);
            // RETURNING IF LIKE DATA NOT FOUND
            if (result.length == 0) {
                return res.status(404).send("Data Not Found");
            }
            // RETURNING LIKE DATA
            return res.status(200).send(result);
        } catch (err) {
            // ERROR IF FAILED TO FETCH LIKE DATA
            return res.status(500).send("Failed To Fetch Like Data");
        }
    }

    // METHOD TO TOGGLE LIKE ON POST OR COMMENT
    async toggleLike(req, res) {
        try {
            // EXTRACTING COLLECTION TYPE FROM QUERY PARAMETERS
            const collectionType = req.query.type;
            // EXTRACTING ID FROM REQUEST PARAMETERS
            const id = req.params.id;

            // TOGGLE LIKE OPERATION FOR POST
            if (collectionType == "post") {
                // TOGGLING LIKE FOR POST
                const result = await likeRepository.postLiketoggle(id);
                // RETURNING ON POST LIKED
                if (result == "Post Liked") {
                    return res.status(201).send("Post Liked Successfully");
                }
                // RETURNING ON POST UNLIKED
                if (result == "Post Unliked") {
                    return res.status(200).send("Post Unliked Successfully");
                }
                // RETURNING IF DATA NOT FOUND
                if (result == "Data Not Found") {
                    return res.status(404).send("Data Not Found");
                }
            }
            // TOGGLE LIKE OPERATION FOR COMMENT
            if (collectionType == "comment") {
                // TOGGLING LIKE FOR COMMENT
                const result = await likeRepository.commentLiketoggle(id);
                // RETURNING ON COMMENT LIKED
                if (result == "Comment Liked") {
                    return res.status(201).send("Comment Liked Successfully");
                }
                // RETURNING ON COMMENT UNLIKED
                if (result == "Comment Unliked") {
                    return res.status(200).send("Comment Unliked Successfully");
                }
                // RETURNING IF DATA NOT FOUND
                if (result == "Data Not Found") {
                    return res.status(404).send("Data Not Found");
                }
            }
            // RETURNING ERROR IF URL PARAMETERS ARE INCORRECT
            return res.status(400).send("It Looks There Is Some Issue In The URL \n Follow These Steps To Get Correct Output \n 1. Check The URL \n 2. Check The ID Passed As URL Parameter \n 3. Check The Query Parameter (post or comment only). \n Please Refer These Example URLs \n http://localhost:5000/api/likes/toggle/6569cd21839f1e272ceb3354?type=comment \n http://localhost:5000/api/likes/toggle/656974769730df225ded20cb?type=post ")
        } catch (err) {
            // ERROR IF FAILED TO PERFORM LIKE/UNLIKE OPERATION
            return res.status(500).send("Failed To Perform Like/Unlike Operation");
        }

    }
}