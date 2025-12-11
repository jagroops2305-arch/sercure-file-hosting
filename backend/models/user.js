const mongoDB = require('mongodb');

const userSchema = new mongoDB.Schema({
    usernamer: { 
        type: String,
        required: true,
        minlenghth: 3,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoDB.model('User', userSchema);