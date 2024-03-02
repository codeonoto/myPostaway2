import FriendshipRepository from "./friendship.repository.js";
// INITIALIZE AN INSTANCE OF FRIENDSHIPREPOSITORY
const friendshipRepository = new FriendshipRepository();

// FRIENDSHIPCONTROLLER CLASS RESPONSIBLE FOR HANDLING FRIENDSHIP-RELATED OPERATIONS
export default class FriendshipController {

    // METHOD TO RETRIEVE A USER'S FRIEND LIST
    async getUserFriendList(req, res) {
        try {
            // EXTRACT THE USERID FROM REQUEST PARAMETERS
            const userId = req.params.userId;
            // RETRIEVE THE USER'S FRIEND LIST USING THE FRIENDSHIPREPOSITORY
            const friends = await friendshipRepository.getUserFriendList(userId);
            // CHECK IF THE USER HAS ANY FRIENDS
            if (!friends || friends.length == 0) {
                return res.status(404).send("Friends Not Found");
            }
            // RETURN THE USER'S FRIEND LIST
            return res.status(200).send(friends);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Failed To Fetch Friend List");
        }
    }

    // METHOD TO TOGGLE FRIENDSHIP STATUS
    async toggleFriendship(req, res) {
        try {
            // EXTRACT THE FRIENDID FROM REQUEST PARAMETERS
            const friendId = req.params.friendId;
            // TOGGLE THE FRIENDSHIP STATUS USING THE FRIENDSHIPREPOSITORY
            const result = await friendshipRepository.toggleFriendship(friendId);

            // HANDLE DIFFERENT SCENARIOS BASED ON THE RESULT OF FRIENDSHIP TOGGLING
            if (result == "User Not Found") {
                return res.status(404).send("User Not Found");
            }
            if (result == "Friend Request Cancelled") {
                return res.status(200).send("Friend Request Cancelled");
            }
            if (result == "Friend Request Cannot Be Sent To Yourself") {
                return res.status(400).send("Friend Request Cannot Be Sent To Yourself");
            }
            if (result == "You Are Already Friends") {
                return res.status(409).send("You Are Already Friends");
            }

            // RETURN THE RESULT WITH APPROPRIATE STATUS CODE
            return res.status(201).send(result);
        } catch (err) {
            return res.status(500).send("Failed To Perform Friendship Operations");
        }
    }

    // METHOD TO RETRIEVE PENDING FRIEND REQUESTS
    async getPendingFriendRequest(req, res) {
        try {
            // RETRIEVE PENDING FRIEND REQUESTS USING THE FRIENDSHIPREPOSITORY
            const requests = await friendshipRepository.getPendingFriendRequest();
            // CHECK IF THERE ARE PENDING FRIEND REQUESTS
            if (!requests || requests.length == 0) {
                return res.status(404).send("Friend Request Not Found");
            }
            // RETURN THE PENDING FRIEND REQUESTS
            return res.status(200).send(requests);
        } catch (err) {
            return res.status(500).send("Failed To Fetch Friend Requests");
        }
    }

    // METHOD TO RESPOND TO A FRIEND REQUEST
    async responseToFriendRequest(req, res) {
        try {
            // EXTRACT FRIENDID AND RESPONSE FROM REQUEST PARAMETERS AND QUERY
            const friendId = req.params.friendId;
            const response = req.query.response;
            // RESPOND TO THE FRIEND REQUEST USING THE FRIENDSHIPREPOSITORY
            const result = await friendshipRepository.responseToFriendRequest(friendId, response);

            // HANDLE DIFFERENT RESPONSES TO THE FRIEND REQUEST
            if (result == "Friend Request Not Found") {
                return res.status(404).send("Friend Request Not Found");
            }
            if (result == "Friend Request Accepted") {
                return res.status(200).send("Friend Request Accepted");
            }
            if (result == "Friend Request Rejected") {
                return res.status(204).send("Friend Request Rejected");
            }
            // PROVIDE DETAILED INSTRUCTIONS FOR INCORRECT URL USAGE
            return res.status(400).send("It Looks There Is Some Issue In The URL \n Follow These Steps To Get Correct Output \n 1. Check The URL \n 2. Check The Friend ID Passed As URL Parameter \n 3. Check The Query Parameter (accept or reject only). \n Please Refer These Example URLs \n http://localhost:5000/api/friends/response-to-request/65689aa32124f6d74e83c0e6?response=reject \n http://localhost:5000/api/friends/response-to-request/65689aa32124f6d74e83c0e6?response=accept ")

        } catch (err) {
            return res.status(500).send("Failed To Response Friend Requests");
        }
    }
}


