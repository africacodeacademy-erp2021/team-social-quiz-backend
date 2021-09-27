const mongoose = require('mongoose')

const myUserSchema = mongoose.Schema({
    username: {
        type: String,
        required: false
    },

    password:{
        type: String,
        required: false
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("User", myUserSchema);