const mongoose = require('mongoose');
const Cafe = require('../models/cafeModel');         
require('dotenv').config();

  const createCafeSampleData = async () => {
    try {
      // Connect to the database
      await mongoose.connect('mongodb+srv://Saranya_M:Ammu%401234@cafeteriadb.tswld6o.mongodb.net/UNT_Cafeteria_Customers?retryWrites=true&w=majority&appName=CafeteriaDB', {
      });
      console.log('Connected to newly created database by Saranya ');

      // Clear existing cafes (optional, for a fresh start)
      await Cafe.deleteMany({});
      console.log('Cleared existing cafes');

      // Sample Cafe Data
      const sampleCafes = [
        {
          
          name: 'Discovery Perks Grill',
          location: 'Discovery Park, UNT',
          description: ' Burgers, Sandwiches, and Fries.',
          imageURL: 'https://www.savingdessert.com/wp-content/uploads/2016/06/Marinated-Burgers-5.jpg',
          rating: 4.6,
          categories: [] // Placeholder, to be updated with Category ObjectIDs later
        },
        {
          
          name: 'Discovery Perks Market',
          location: 'Discovery Park, UNT',
          description: 'Coffee, Snacks.',
          imageURL: 'https://www.keep-calm-and-eat-ice-cream.com/wp-content/uploads/2022/08/Ice-cream-sundae-hero-11.jpg',
          rating: 4.2,
          categories: []
        },
        
      ];

      // Insert sample cafes
      const insertedCafes = await Cafe.insertMany(sampleCafes);
      console.log('Sample cafes inserted:');
      insertedCafes.forEach(cafe => {
        console.log(`- ${cafe.name}: ${cafe._id}`);
      });

      console.log('Cafe sample data creation complete');
    } catch (error) {
      console.error('Error creating cafe sample data:', error);
    } finally {
      mongoose.connection.close();
    }
  };

  createCafeSampleData();