const multer = require("multer");
const path = require("path");

// File storage location
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// File filter for PDF + MP4
const fileFilter = (req, file, cb) => {
    const allowedTypes = [".pdf", ".mp4"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedTypes.includes(ext)) {
        return cb(new Error("Only PDF and MP4 files are allowed"));
    }

    cb(null, true);
};

// Max file size = 20MB
module.exports = multer({
    storage,
    fileFilter,
    limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});
