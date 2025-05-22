const mongoose = require('mongoose');
const Category = require('../models/categoryModel'); // Adjust path as needed
const dotenv = require('dotenv');

dotenv.config();

const createCategorySampleData = async () => {
  try {
    await mongoose.connect('mongodb+srv://Saranya_M:Ammu%401234@cafeteriadb.tswld6o.mongodb.net/UNT_Cafeteria_Customers?retryWrites=true&w=majority&appName=CafeteriaDB');
    console.log('Connected to database');

    const Cafe = require('../models/cafeModel'); 
    const cafes = await Cafe.find({});

    if (cafes.length === 0) {
      console.error('No cafes found. Please insert cafes first.');
      return;
    }

    // Sample categories
    const sampleCategories = [
      {
        name: 'Burgers',
        imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
        cafe: cafes[0]._id,
        items: []
      },
      {
        name: 'Sandwiches',
        imageUrl: 'https://t4.ftcdn.net/jpg/02/58/91/65/360_F_258916556_B6oirjJOKQkaxs39KPi9wjf9ePlT7zF8.jpg',
        cafe: cafes[0]._id,
        items: []
      },
      {
        name: 'Sides',
        imageUrl: 'https://static.toiimg.com/thumb/54659021.cms?imgsize=275086&width=800&height=800',
        cafe: cafes[0]._id,
        items: []
      },
      {
        name: 'Drinks',
        imageUrl: 'https://w0.peakpx.com/wallpaper/677/584/HD-wallpaper-coca-cola-ice-glass-splashes-food-drinks.jpg',
        cafe: cafes[0]._id,
        items: []
      },
      {
        name: 'Coffee',
        imageUrl: 'https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg',
        cafe: cafes[1]._id,
        items: []
      },
      {
        name: 'Snacks',
        imageUrl: 'https://thesnackattack.ca/cdn/shop/files/0f0430ba-5f74-4171-b7d6-bc1ec6bc2a68.jpg?v=1711385367',
        cafe: cafes[1]._id,
        items: []
      }
    ];

    for (const categoryData of sampleCategories) {
      const existing = await Category.findOne({
        name: categoryData.name,
        cafe: categoryData.cafe
      });

      let category;
      if (existing) {
        console.log(`Category already exists: ${existing.name} (ID: ${existing._id})`);
        category = existing;
      } else {
        category = await Category.create(categoryData);
        console.log(`Inserted category: ${category.name} (ID: ${category._id})`);
      }

      // Add category to cafe's category list using $addToSet to avoid duplicates
      await Cafe.updateOne(
        { _id: category.cafe },
        { $addToSet: { categories: category._id } }
      );
    }

    console.log('Category setup complete.');
  } catch (error) {
    console.error('Error inserting category sample data:', error);
  } finally {
    mongoose.connection.close();
  }
};

createCategorySampleData();
