const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WeaponSchema = new Schema({
    class: {
        type: String,
            required: true
    },
    name: {
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
    attackMin: {
        type: Number,
        required: true
    },
    attackMax: {
        type: Number,
        required: true
    },
    bonus: {
        type: String,
        required: true
    },
});

// Export the model
module.exports = mongoose.model('Weapon', WeaponSchema);