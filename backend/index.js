const express = require('express');
  const authRoutes = require('./routes/auth');
  const connectDB = require('./config/db');
  require('dotenv').config();
  const cors = require('cors');

  const app = express();

  // Configure CORS for Expo tunnel
  app.use(cors({
    origin: 'https://exp.direct', // Match Expo dev server with --tunnel
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  app.use(express.json());
  app.use('/api', authRoutes);

  // Connect to MongoDB via Mongoose
  connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });