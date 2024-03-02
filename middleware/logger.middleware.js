// THIS MIDDLEWARE LOGS EVERY INCOMING REQUEST URL ALONG WITH REQUEST BODY TO A LOG FILE
// IMPORT FILE SYSTEM MODULE
import fs from 'fs';
// PROMISIFIED VERSION OF FILE SYSTEM FUNCTIONS
const fsPromise = fs.promises;
// ASYNCHRONOUS FUNCTION TO APPEND LOG DATA TO A FILE
async function log(logData) {
    try {
        // APPEND TIMESTAMPED LOG DATA TO 'log.txt' FILE
        logData = `\n ${new Date().toString()} - ${logData}`;
        await fsPromise.appendFile('log.txt', logData);
    } catch (err) {
        console.log(err);
    }
}
// LOGGER MIDDLEWARE FUNCTION
const loggerMiddleware = async (req, res, next) => {
    // CHECK IF THE URL DOES NOT CONTAIN 'signin' OR 'signup'
    if (!req.url.includes("signin") && !req.url.includes("signup")) {
        // CREATE LOG DATA CONTAINING REQUEST URL AND BODY
        const logData = `${req.url} - ${JSON.stringify(req.body)}`;
        // CALL log FUNCTION TO WRITE LOG DATA TO FILE
        await log(logData);
    }
    // MOVE TO THE NEXT MIDDLEWARE IN THE CHAIN
    next();
};
// EXPORT LOGGER MIDDLEWARE FUNCTION
export default loggerMiddleware;