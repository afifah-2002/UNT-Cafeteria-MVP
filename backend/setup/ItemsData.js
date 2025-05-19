/**
 * seeds/items.seed.js
 *
 * Drops the existing `items` collection (if it exists) and inserts
 * four burger records that match your Item schema.
 */

const mongoose = require('mongoose');
const Item = require('../models/itemModel');         
require('dotenv').config();

async function setupItemsCollection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas via Mongoose');

    
    const collections = await mongoose.connection.db
      .listCollections({ name: 'items' })
      .toArray();

    if (collections.length > 0) {
      await mongoose.connection.db.dropCollection('items');
      console.log('Existing items collection dropped');
    } else {
      console.log('No existing items collection to drop');
    }

    
    const GRILL_CAFE_ID     = '6827c89dcf34d35572148379';
    const BURGERS_CATEGORY_ID = '6827ccffcf34d35572148384';
    const now = new Date();

    await Item.create([
      {
        name: 'Cheeseburger',
        description:
          'Quarter‑pound beef patty with melted cheddar, lettuce, tomato, pickles, and house sauce.',
        price: 6.99,
        category: BURGERS_CATEGORY_ID,
        cafe: GRILL_CAFE_ID,
        createdAt: now
      },
      {
        name: 'Veggie burger',
        description:
          'Grilled black‑bean patty with avocado, lettuce, tomato, red onion, and herb mayo.',
        price: 6.49,
        category: BURGERS_CATEGORY_ID,
        cafe: GRILL_CAFE_ID,
        createdAt: now
      },
      {
        name: 'Chicken burger',
        description:
          'Marinated grilled chicken breast, Swiss cheese, lettuce, tomato, and garlic aioli.',
        price: 7.25,
        category: BURGERS_CATEGORY_ID,
        cafe: GRILL_CAFE_ID,
        createdAt: now
      },
      {
        name: 'Bacon burger',
        description:
          'Smoky bacon, double American cheese, crispy onions, and barbeque sauce.',
        price: 7.99,
        category: BURGERS_CATEGORY_ID,
        cafe: GRILL_CAFE_ID,
        createdAt: now
      }
    ]);

    console.log('Items collection created with sample burger data');
  } catch (error) {
    console.error('Error setting up items collection:', error);
  } finally {
    await mongoose.connection.close();
  }
}

setupItemsCollection();
