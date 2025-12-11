const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose"); // <-- YOU FORGOT THIS LINE
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// Routes
const authRoutes = require('./routes/authroutes.js');
app.use('/api', authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Secure File Hosting Backend Running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
