const File = require("../models/File");

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

// GET PUBLIC FILES
exports.getPublicFiles = async (req, res) => {
    try {
        const files = await File.find({ privacy: "public" }).sort({ uploaded_at: -1 });
        return res.status(200).json(files);
    } catch (error) {
        console.error("Error in getPublicFiles:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// GET MY FILES
exports.getMyFiles = async (req, res) => {
    try {
        const files = await File.find({ uploaded_by: req.user.id }).sort({ uploaded_at: -1 });
        return res.status(200).json(files);
    } catch (error) {
        console.error("Error in getMyFiles:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
