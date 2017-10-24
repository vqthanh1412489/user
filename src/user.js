const mongoose = require('mongoose');
const { hash } = require('bcrypt');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        minlength: 4,
        unique: true
    }
});

const User = mongoose.model('user', UserSchema);

User.signUp = function(username, password, email){
    return hash(password, 8)
    .then(encrypted => {
        const user = new User({username, password: encrypted, email});
        return user.save();
    });
};

module.exports = User;