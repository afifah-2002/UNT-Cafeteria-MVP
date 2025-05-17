const mongoose = require('mongoose');
require('dotenv').config();


const dbURI = process.env.MONGODB_URI;
console.log("Connecting to:", dbURI);
const connectDB = async () => {
    try {

        await mongoose.connect(dbURI, {

        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB; 
