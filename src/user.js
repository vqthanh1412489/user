const mongoose = require('mongoose');
const { hash, compare } = require('bcrypt');
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

// User.signUp = function(username, password, email){
//     return hash(password, 8)
//     .then(encrypted => {
//         const user = new User({username, password: encrypted, email});
//         return user.save();
//     });
// };

// Do kết quả trả ra của hàm async luôn là Promise nên ở ngoài ta có thể .then .catch
User.signUp = async function (username, password, email) {
    const encrypted = await hash(password, 8);
    if (!encrypted || !email || !username) throw new Error('Thieu thong tin');
    const user = new User({username, password: encrypted, email});
    await user.save();
}

User.signIn = async function (email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Email khong ton tai.');
    const same = await compare(password, user.password);
    if (!same) throw new Error('Sai password.');
    return user;
};

module.exports = User;