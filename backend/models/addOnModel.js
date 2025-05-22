// addOn.model.js
const mongoose = require('mongoose');

const addOnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Link it to the Category model
    required: true,
  },
});

module.exports = mongoose.model('AddOn', addOnSchema, 'AddOns');
