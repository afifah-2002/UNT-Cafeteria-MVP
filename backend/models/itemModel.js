const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        trim: true,
        default: ''
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },


    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    cafe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cafe',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
