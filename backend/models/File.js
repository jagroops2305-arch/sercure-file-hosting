const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    size: Number,
    privacy: { type: String, enum: ["public", "private"], default: "public" },
    uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    uploaded_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("File", fileSchema);
