// controllers/FavouritesController.js
const Favourite = require('../models/FavouritesModel');
const mongoose = require('mongoose');

exports.getUserFavourites = async (req, res) => {
  const { userId } = req.params
  console.log('Received GET userId:', userId);
  try {
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid User ID format' });
    }
    console.log('Querying favourites for UserID:', userId); // Debug log
    const favourites = await Favourite.find({ UserID: userId }).populate('itemID');
    console.log('Fetched favourites:', favourites); // Debug log
    if (!favourites || favourites.length === 0) {
      return res.status(404).json({ message: 'No favorites found for this user' });
    }
    res.json(favourites);
  } catch (error) {
    console.error('Error in getUserFavourites:', error.stack); // Full stack trace
    res.status(500).json({ error: 'Server error while retrieving favorites' });
  }
};

exports.addFavourite = async (req, res) => {
  const { UserID, itemID } = req.body;
  console.log('Received POST data:', req.body);
  console.log('Destructured - UserID:', UserID, 'itemID:', itemID); 
  try {
    if (!UserID || !itemID) {
      return res.status(400).json({ error: 'User ID and Item ID are required' });
    }
    if (!mongoose.Types.ObjectId.isValid(UserID) || !mongoose.Types.ObjectId.isValid(itemID)) {
      return res.status(400).json({ error: 'Invalid User ID or Item ID' });
    }
    const existingFavourite = await Favourite.findOne({ UserID, itemID });
    if (existingFavourite) {
      return res.status(400).json({ error: 'Item is already in favorites' });
    }
    const favourite = new Favourite({ UserID, itemID });
    await favourite.save();
    res.status(201).json({ message: 'Item added to favorites', favourite });
  } catch (error) {
    console.error('Error in addFavourite:', error.stack);
    res.status(500).json({ error: 'Server error while adding favorite' });
  }
};

exports.removeFavourite = async (req, res) => {
  const { userId, itemId } = req.params;
  console.log('Received DELETE userId and itemId:', { userId, itemId });
  try {
    if (!userId || !itemId) {
      return res.status(400).json({ error: 'User ID and Item ID are required' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ error: 'Invalid User ID or Item ID' });
    }

    // Note 'itemID' instead of 'ItemID'
    const favourite = await Favourite.findOneAndDelete({ UserID: userId, itemID: itemId });

    console.log(favourite);

    if (!favourite) {
      return res.status(404).json({ error: 'Favorite not found' });
    } 

    res.json({ message: 'Item removed from favorites' });
  } catch (error) {
    console.error('Error in removeFavourite:', error.stack);
    res.status(500).json({ error: 'Server error while removing favorite' });
  }
};
