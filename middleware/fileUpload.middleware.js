// IMPORT MULTER FOR HANDLING FILE UPLOADS
import multer from "multer";
// CONFIGURE STORAGE SETTINGS FOR UPLOADS
const storage = multer.diskStorage({
    // SET DESTINATION FOLDER FOR UPLOADS
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    // SET FILENAME FOR UPLOADED FILES
    filename: (req, file, cb) => {
        // CREATE A UNIQUE FILENAME PREFIX WITH TIMESTAMP AND RANDOM NUMBER
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // EXTRACT ORIGINAL FILE EXTENSION
        const fileExtension = file.originalname.split('.').pop();
        // CONSTRUCT FINAL FILENAME WITH UNIQUE PREFIX AND ORIGINAL EXTENSION
        const fileName = uniqueSuffix + '.' + fileExtension;
        // CALL CALLBACK FUNCTION WITH THE GENERATED FILENAME
        cb(null, fileName);
    }
});
// CONFIGURE UPLOAD SETTINGS USING MULTER WITH SPECIFIED STORAGE OPTIONS
export const upload = multer({ storage: storage });
