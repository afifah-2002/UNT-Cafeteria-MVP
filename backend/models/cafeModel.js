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
    imageURL: {
        type: String,
        trim: true,
        default: '' // Optional: set a default empty string or placeholder URL
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0  // You can choose to default to 0 or null
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


const Cafe = mongoose.model('Cafe', cafeSchema,'Cafes');

module.exports = Cafe;
