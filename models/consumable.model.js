const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConsumableSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    effect: {
        type: String,
        required: true
    }
});

// Export the model
module.exports = mongoose.model('Consumable', ConsumableSchema);