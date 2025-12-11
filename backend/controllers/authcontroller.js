const userModel = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

    // check if missing fields
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields." });
    }
    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email." });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    // create new user
    const newUser = new userModel({
        username,
        email,
        password: hashedPassword
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
    console.error("🔥 FULL ERROR LOG:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
}

};