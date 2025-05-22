/**
 * seeds/items.seed.js
 *
 * Drops the existing `items` collection (if it exists) and inserts
 * four burger records that match your Item schema.
 */

const mongoose = require('mongoose');
const Item = require('../models/itemModel');
const Cafe = require('../models/cafeModel');
const Category = require('../models/categoryModel');
require('dotenv').config();

async function setupItemsCollection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Drop existing 'items' collection if it exists
    const collections = await mongoose.connection.db
      .listCollections({ name: 'items' })
      .toArray();
    if (collections.length > 0) {
      await mongoose.connection.db.dropCollection('items');
      console.log('Dropped existing items collection');
    }

    // Find the correct cafe and category
    const cafe = await Cafe.findOne({ name: 'Discovery Perks Grill' });
    if (!cafe) throw new Error('Cafe not found: Discovery Perks Grill');

    const category = await Category.findOne({ name: 'Burgers', cafe: cafe._id });
    if (!category) throw new Error('Category not found: Burgers');

    const now = new Date();

    // Insert sample burger items
    await Item.create([
      {
        name: 'Cheeseburger',
        imageUrl : 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        description: 'Quarter‑pound beef patty with melted cheddar, lettuce, tomato, pickles, and house sauce.',
        price: 6.99,
        category: category._id,
        cafe: cafe._id,
        createdAt: now
      },
      {
        name: 'Veggie Burger',
        imageUrl : 'https://www.noracooks.com/wp-content/uploads/2023/04/veggie-burgers-1-2.jpg',
        description: 'Grilled black‑bean patty with avocado, lettuce, tomato, red onion, and herb mayo.',
        price: 6.49,
        category: category._id,
        cafe: cafe._id,
        createdAt: now
      },
      {
        name: 'Chicken Burger',
        imageUrl : 'https://t3.ftcdn.net/jpg/02/19/46/78/360_F_219467809_GYKTUDodRRk1o64ZltOURhzfvEYLk6zq.jpg',
        description: 'Marinated grilled chicken breast, Swiss cheese, lettuce, tomato, and garlic aioli.',
        price: 7.25,
        category: category._id,
        cafe: cafe._id,
        createdAt: now
      },
      {
        name: 'Bacon Burger',
        imageUrl : 'https://www.pastureprimewagyu.com/wp-content/uploads/Bacon-burger-plus.jpg',
        description: 'Smoky bacon, double American cheese, crispy onions, and barbeque sauce.',
        price: 7.99,
        category: category._id,
        cafe: cafe._id,
        createdAt: now
      }
    ]);

    console.log('Sample items inserted into items collection');
  } catch (error) {
    console.error(' Error setting up items collection:', error);
  } finally {
    await mongoose.connection.close();
  }
}

setupItemsCollection();
