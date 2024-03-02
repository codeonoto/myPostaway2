import mongoose from "mongoose";
import { friendshipSchema } from "./friendship.schema.js";
import { loggdInUserID } from "../../middleware/jwt.middleware.js";
import { UserModel } from "../user/user.repositary.js";

// CREATING A MODEL BASED ON FRIENDSHIP SCHEMA
const FriendshipModel = mongoose.model('Friend', friendshipSchema);

// FRIENDSHIP REPOSITORY CLASS
export default class FriendshipRepository {

    // METHOD TO RETRIEVE USER'S FRIEND LIST
    async getUserFriendList(userId) {
        try {
            return await FriendshipModel.find({ userID: new mongoose.Types.ObjectId(userId), status: "Friends" })
        } catch (err) {
            throw err;
        }
    }

    // METHOD TO TOGGLE FRIENDSHIP
    async toggleFriendship(friendId) {
        try {
            const friend = await UserModel.findById(friendId);
            // CHECK IF THE USER TO BECOME FRIENDS WITH EXISTS
            if (!friend) {
                return "User Not Found";
            }
            // CHECK IF TRYING TO SEND FRIEND REQUEST TO SELF
            if (loggdInUserID == friendId) {
                return "Friend Request Cannot Be Sent To Yourself";
            }

            const isFriend = await FriendshipModel.findOne({ userID: new mongoose.Types.ObjectId(friendId), friendUserId: new mongoose.Types.ObjectId(loggdInUserID) })
            // CHECK IF ALREADY FRIENDS
            if (isFriend) {
                return "You Are Already Friends";
            }
            const currentUser = await UserModel.findById(loggdInUserID);
            const result = await FriendshipModel.findOne({ userID: new mongoose.Types.ObjectId(friendId), requesterUserID: new mongoose.Types.ObjectId(loggdInUserID) });

            // TOGGLE FRIENDSHIP BASED ON EXISTING RELATIONSHIP
            if (!result) {
                const frienObj = {
                    requesterName: currentUser.name,
                    requesterGender: currentUser.gender,
                    requesterEmail: currentUser.email,
                    requesterProfileImg: currentUser.imageURL,
                    requesterUserID: new mongoose.Types.ObjectId(loggdInUserID),
                    userID: new mongoose.Types.ObjectId(friendId),
                    status: "Pending",
                }
                const friend = new FriendshipModel(frienObj);
                return await friend.save();
            } else {
                await FriendshipModel.findOneAndDelete({ userID: new mongoose.Types.ObjectId(friendId), requesterUserID: new mongoose.Types.ObjectId(loggdInUserID) });
                return "Friend Request Cancelled";
            }
        } catch (err) {
            throw err;
        }
    }

    // METHOD TO RETRIEVE PENDING FRIEND REQUESTS
    async getPendingFriendRequest() {
        try {
            return await FriendshipModel.find({ userID: new mongoose.Types.ObjectId(loggdInUserID), status: "Pending" });
        } catch (err) {
            throw err;
        }
    }

    // METHOD TO RESPOND TO A FRIEND REQUEST
    async responseToFriendRequest(friendId, response) {
        try {
            const friendObj = await FriendshipModel.findOne({ userID: new mongoose.Types.ObjectId(loggdInUserID), requesterUserID: new mongoose.Types.ObjectId(friendId) });
            // CHECK IF FRIEND REQUEST EXISTS
            if (!friendObj) {
                return "Friend Request Not Found";
            }
            // ACCEPT FRIEND REQUEST
            if (response == "accept") {
                const newFriendObj = {
                    friendName: friendObj.requesterName,
                    friendGender: friendObj.requesterGender,
                    friendEmail: friendObj.requesterEmail,
                    friendProfileImg: friendObj.requesterProfileImg,
                    friendUserId: new mongoose.Types.ObjectId(friendId),
                    userID: new mongoose.Types.ObjectId(loggdInUserID),
                    status: "Friends",
                }
                await FriendshipModel.findOneAndReplace(friendObj, newFriendObj);
                return "Friend Request Accepted";
            }
            // REJECT FRIEND REQUEST
            if (response == "reject") {
                await FriendshipModel.findOneAndDelete({ userID: new mongoose.Types.ObjectId(loggdInUserID), requesterUserID: new mongoose.Types.ObjectId(friendId) });
                return "Friend Request Rejected";
            }
        } catch (err) {
            throw err;
        }
    }
}


