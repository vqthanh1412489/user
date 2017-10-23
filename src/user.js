const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 10,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        minlength: 11,
        unique: true
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;