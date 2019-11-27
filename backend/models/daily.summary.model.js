const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailySummarySchema = new Schema({
    username: { type: String, required: true },
    nicotine: { type: Number, required: true },
    excersice: { type: Number, required: true },
    sleep: { type: Number, required: true },
    meditation: { type: Number, required: true },
    mood: { type: Number, required: true },
    date: { type: Date, required: true}
}, {
    timestamps: true,
});

const dailySummary = mongoose.model('dailySummary', dailySummarySchema);

module.exports = dailySummary;