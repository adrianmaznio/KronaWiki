const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NewsPostSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: 100
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    },
    body: {
        type: String,
        required: true
    },
});

// Export the model
module.exports = mongoose.model('NewsPost', NewsPostSchema);