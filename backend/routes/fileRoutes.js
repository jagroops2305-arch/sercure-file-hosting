const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { authMiddleware } = require("../middleware/authMiddleware");
const { uploadFile } = require("../controllers/fileController");

// Upload file
router.post("/upload", authMiddleware, upload.single("file"), uploadFile);

module.exports = router;
