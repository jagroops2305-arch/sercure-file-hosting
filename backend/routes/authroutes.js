const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authcontroller');

// Register route
router.post('/register', registerUser);

module.exports = router;
