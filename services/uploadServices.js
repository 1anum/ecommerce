// middlewares to upload files
const multer = require("multer");
const re = new RegExp("\\s+", "g"); //space lae hatauxa ani hyphon le join garxa

// the function below is to eliminate white spaces from the file name
function eliminateWhitespace(imageName) {
    return imageName.replace(re, "-");
}

// now we will create a function to upload the file
const filename = (req, file, next) => {
    let lastIndexof = file.originalname.lastIndexOf(".");  //. le break gareyra aauxa (0,1)
    let originalname = file.originalname.substring(0, lastIndexof);
    let ext = file.originalname.substring(lastIndexof);
    next(null, `${eliminateWhitespace(originalname)}-${Date.now()}${ext}`);
};

// const filename = (req, file, next) => {
// let lastIndexof = file.originalname.lastIndexOf(".");
// let originalname = file.originalname.substring(0, lastIndexof);
// let ext = file.originalname.substring(lastIndexof);
// next(null, `${originalname}-${Date.now()}${ext}`);
// };

const filter = (req, file, next) => { //anonymous function
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "video/mp4" ||
        file.mimetype === "video/gif" ||
        file.mimetype === "video/avi" ||
        file.mimetype === "video/webm" ||
        file.mimetype === "video/mkv"
    ) {
        next(null, true); //match garyo vanee
    } else {
        next(null, false); //match vayana
        return next(
            new Error("Only .jpeg, .jpg, .png, .mp4 and .gif format allowed!")
        );
    }
};

const productImageDestination = (req, file, next) => {
    next(null, `${__dirname}/../public/productUploads`);
};

const ProfileImageDestination = (req, file, next) => {
    next(null, `${__dirname}/../public/profiles`); //__dirname:root directory
};

const productImage = multer({
    storage: multer.diskStorage({
        destination: productImageDestination,
        filename,
    }),
    fileFilter: filter, // filefilter: multer ko auta property ho
});

const profileImage = multer({
    storage: multer.diskStorage({
        destination: ProfileImageDestination,
        filename,
    }),
    fileFilter: filter,
});

// const uploadCompanyVideo = multer({
// storage: multer.diskStorage({
// destination: companyVideoDestination,
// filename,
// }),
// fileFilter: filter,
// });

module.exports = {
    productImage,
    profileImage,
};