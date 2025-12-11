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
