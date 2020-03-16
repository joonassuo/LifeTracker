const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSessionSchema = new Schema({
    userId: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
});

const UserSession = mongoose.model('UserSession', UserSessionSchema);

module.exports = UserSession;