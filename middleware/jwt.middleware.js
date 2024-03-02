// THIS FILE SERVES AS THE AUTHENTICATION MIDDLEWARE USING JSON WEB TOKENS (JWT)
// IMPORT JSONWEBTOKEN LIBRARY FOR TOKEN OPERATIONS
import jwt from 'jsonwebtoken';
// DECLARE AND EXPORT VARIABLES TO HOLD LOGGED-IN USER'S ID, NAME, AND EMAIL
export let loggdInUserID;
export let loggdInUserName;
export let loggdInUserEmail;
// JWT AUTHENTICATION MIDDLEWARE FUNCTION
const jwtAuthoriser = (req, res, next) => {
    // CHECK IF THE REQUEST HEADER CONTAINS A TOKEN
    const token = req.headers['authorization'];
    if (!token) {
        // IF NO TOKEN PROVIDED, RETURN UNAUTHORIZED ACCESS RESPONSE
        return res.status(401).send("Unauthorized Access");
    }
    try {
        // VERIFY THE TOKEN EXTRACTED FROM THE REQUEST HEADER
        const payload = jwt.verify(token, 'C3vYbr2by8');
        req.userID = payload.userID; // SET USER ID IN REQUEST OBJECT
        // RETRIEVE AND SET LOGGED-IN USER'S NAME, EMAIL, AND ID FROM THE TOKEN PAYLOAD
        loggdInUserName = payload.name;
        loggdInUserEmail = payload.email;
        loggdInUserID = payload.userID;
    } catch (err) {
        // IF TOKEN VERIFICATION FAILS, RETURN UNAUTHORIZED ACCESS RESPONSE
        return res.status(401).send("Unauthorized Access");
    }
    // CONTINUE TO THE NEXT MIDDLEWARE OR ROUTE HANDLER
    next();
}
// EXPORT THE JWT AUTHENTICATION MIDDLEWARE FUNCTION
export default jwtAuthoriser;

