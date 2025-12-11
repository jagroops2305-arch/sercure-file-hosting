const File = require("../models/File");
const fs = require("fs");
const path = require("path");


// =========================
// 1️⃣ UPLOAD FILE
// =========================
exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { privacy } = req.body;

        const newFile = new File({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            privacy: privacy || "public",
            uploaded_by: req.user.id
        });

        await newFile.save();

        return res.status(201).json({
            message: "File uploaded successfully",
            file: newFile
        });

    } catch (error) {
        console.error("Error in uploadFile:", error);
        return res.status(500).json({ message: "Server error" });
    }
};



// =========================
// 2️⃣ GET PUBLIC FILES
// =========================
exports.getPublicFiles = async (req, res) => {
    try {
        const files = await File.find({ privacy: "public" })
            .sort({ uploaded_at: -1 });

        return res.status(200).json(files);

    } catch (error) {
        console.error("Error in getPublicFiles:", error);
        return res.status(500).json({ message: "Server error" });
    }
};



// =========================
// 3️⃣ GET MY FILES (LOGGED-IN USER)
// =========================
exports.getMyFiles = async (req, res) => {
    try {
        const files = await File.find({ uploaded_by: req.user.id })
            .sort({ uploaded_at: -1 });

        return res.status(200).json(files);

    } catch (error) {
        console.error("Error in getMyFiles:", error);
        return res.status(500).json({ message: "Server error" });
    }
};



// =========================
// 4️⃣ DELETE FILE
// =========================
exports.deleteFile = async (req, res) => {
    try {
        const fileId = req.params.id;

        const file = await File.findById(fileId);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        // check ownership
        if (file.uploaded_by.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: Cannot delete this file" });
        }

        // delete file from uploads folder
        fs.unlink(path.join(__dirname, "..", file.path), err => {
            if (err) console.log("File deletion error:", err);
        });

        // delete record from DB
        await File.findByIdAndDelete(fileId);

        return res.status(200).json({ message: "File deleted successfully" });

    } catch (error) {
        console.error("Error in deleteFile:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
