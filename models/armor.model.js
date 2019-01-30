const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ArmorSchema = new Schema({
    class: {
        type: String,
            required: true
    },
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    defenseMin: {
        type: Number,
        required: true
    },
    defenseMax: {
        type: Number,
        required: true
    },
    rarity: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    set: {
        type: String,
        required: true
    },
});

// Export the model
module.exports = mongoose.model('Armor', ArmorSchema);