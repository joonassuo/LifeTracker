const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 10,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true,
        default: ''
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
