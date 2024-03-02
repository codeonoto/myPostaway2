//THIS FILE IS HANDLLING ALL THE REQUESTS AND RESPONSES FOR USER ROUTES

//IMPORTING REQUIRED MODULES 
import jwt from "jsonwebtoken";
import UserRepository from "./user.repositary.js";
//INSTANCE OF USERREPOSITORY CLAASS
const userRepository = new UserRepository();



export default class UserController {
    //THIS FUNCTION CHECKS IF THE USER IS ALREADY REGISTERED AND IF NOT IT REGISTRES THE USER OTHERWISE NOT
    async signUp(req, res) {
        try {
            const newUser = await userRepository.addNewUser(req.body);
            if (newUser === "Email Already Exists") {
                return res.status(409).send("Email Already Exists"); //IF USER IS ALREADY EXISTS
            } else {
                return res.status(201).send(newUser); //IF USER IS NOT REGISTERED
            }
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS IN TRY BLOCK
            return res.status(500).send("Failed To SignUp");
        }
    }

    //THIS FUNCTION CHECKS IF THE USERS CREDENTIALS ARE CORRECT OF NOT IF COREECT SENDS THE AUTHENTICATION TOKEN OTHERWISE NOT
    async signIn(req, res) {
        try {
            const validUser = await userRepository.confirmUser(req.body);
            if (!validUser) {
                return res.status(401).send("Wrong Credentials"); // IF CREDENTIALS ARE WRONG
            } else {

                const token = jwt.sign({ userID: validUser._id, email: validUser.email, name: validUser.name }, "C3vYbr2by8", { expiresIn: '1h' });
                return res.status(200).send(token); // IF CREDENTIALS ARE CORRECT

            }

        } catch (err) {
            //HANDLING UNEXPECTED ERRORS IN TRY BLOCK
            return res.status(500).send("Failed To SignIn");
        }
    }

    //THIS FUNCTION FETCHES THE DETAILS OF USER WITH GIVEN USER ID
    async getOneUserDetails(req, res) {
        try {
            const userId = req.params.userId;
            const user = await userRepository.getOneUserDetails(userId);
            if (!user) {
                return res.status(404).send("User Not Found"); //IF USER DID NOT FOUND
            } else {
                return res.status(200).send(user); //IF USER FOUND
            }
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS IN TRY BLOCK
            return res.status(500).send("Failed TO Fetch User Data");
        }
    }

    //THIS FUNCTION FETCHES ALL THE USERS AVAILABLE ON THE SERVER
    async getAllUserDetails(req, res) {
        try {
            const users = await userRepository.getAllUserDetails();
            if (!users) {
                return res.status(404).send("Users Not Found")//IF SERVER DOES NOT HAVE ANY USER
            } else {
                return res.status(200).send(users);//SENDING THE THE LIST OF ALL USERS
            }
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS IN TRY BLOCK
            return res.status(500).send("Failed To Fetch Users Data");
        }
    }

    //THIS FUNCTION TAKES THE USER ID AND UPDATES THE USER DETAILS 
    async updateUserDetails(req, res) {
        try {
            const imageURL = req.file.filename;//PROFILE PHOTO
            const userId = req.params.userId;//USER ID
            const { name, gender } = req.body;
            const updateUserObj = {//THIS IS OBJECT HAS ALL THE UPDATED DETAILS 
                name: name,
                gender: gender,
                imageURL: imageURL
            }
            const user = await userRepository.updateUserDetails(userId, updateUserObj);
            if (user == "User Not Found") {
                return res.status(404).send("User Not Found");//IF NO USER FOUND WITH THE GIVEN USER ID
            }
            if (user === "User Is Not Logged-In") {
                //IF THE USER TRIES TO UPDATE SOMEONE ELSE'S DETAILS
                return res.status(403).send("Not Allowed To Update Someone Else's Profile");
            }
            return res.status(200).send(user);// IF EVERYTHING IS OK THEN UPDATE THE USER DETAILS 

        } catch (err) {
            //HANDLING UNEXPECTED ERRORS IN TRY BLOCK
            return res.status(500).send("Failed To Update Users Data");
        }

    }

    //THIS FUNCTIONS LOGS THE USER OUT FROM THE PORTAL
    async logOut(req, res) {
        try {
            return res.status(200).send("Log-Out successful"); // ON SUCCESSFUL LOGOUT
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS IN TRY BLOCK
            return res.status(500).send("Failed To Logout");
        }
    }

    //THIS FUNCTION LOGS THE USER OUT FROM ALL DEVICES 
    async logoutFromEverywhere(req, res) {
        try {
            return res.status(200).send("Logged-Out From All Devices");// ON SUCCESSFUL LOGOUT
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS IN TRY BLOCK
            return res.status(500).send("Failed To Logout From All Devices");
        }
    }
}