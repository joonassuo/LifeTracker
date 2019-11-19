const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailySummarySchema = new Schema({
    username: { type: String, required: true },
    nicotine: { type: Number, required: true },
    excersice: {
        sport: { type: String, required: true, trim: true },
        duration: { type: Number, required: true }
    },
    meditation: { type: Number, required: true },
    mood: { type: Number, required: true }
}, {
    timestamps: true,
});