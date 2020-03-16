const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailySummarySchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    hit_the_sack: {
        type: Number,
        required: true
    },
    wake_up: {
        type: Number,
        required: true
    },
    nicotine: {
        type: Number,
        required: true
    },
    excersice: {
        type: Number,
        required: true
    },
    meditation: {
        type: Number,
        required: true
    },
    mood: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
});

const dailySummary = mongoose.model('dailySummary', dailySummarySchema);

module.exports = dailySummary;