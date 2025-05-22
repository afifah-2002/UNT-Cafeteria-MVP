const mongoose = require('mongoose');
  const User = require('../models/Users');
  require('dotenv').config();

  async function setupUsersCollection() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB Atlas via Mongoose');

      // Drop the existing users collection to avoid duplicates
      await mongoose.connection.db.dropCollection('users').catch(err => {
        if (err.codeName !== 'NamespaceNotFound') throw err;
        console.log('No existing users collection to drop');
      });

      await User.create([
        {
          euid: 'Smitha45',
          password: 'Smitha456789',
          name: 'Smitha Mohan',
          email: 'SmithaMohan@university.edu',
          createdAt: new Date()
        },
        
      ]);
      console.log('Users collection created with sample data in cafeteria_test_MVP database');
    } catch (error) {
      console.error('Error setting up users collection:', error);
    } finally {
      await mongoose.connection.close();
    }
  }

  setupUsersCollection();