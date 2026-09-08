const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: "General"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const newsmodel = mongoose.model('News', newsSchema);
module.exports = newsmodel;