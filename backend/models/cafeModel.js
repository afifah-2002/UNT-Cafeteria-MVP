const mongoose = require('mongoose');


const cafeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },

    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Cafe = mongoose.model('Cafe', cafeSchema);

module.exports = Cafe;
