const express = require('express');
const router = express.Router();
const { getUserFavourites, addFavourite, removeFavourite } = require('../controllers/FavouritesController');

// 1. Adding route to create favourites  (Calls addFavourite to create a new favorite.)

router.post('/',addFavourite);

// 2. Adding route to get user favourites (Calls getUserFavourites to retrieve favorites for a user.)

router.get('/:userId',getUserFavourites);

// 3. Adding route to remove item from user favourites (Calls removeFavourite to delete a specific favorite.)

router.delete('/:userId/:itemId',removeFavourite); 

module.exports = router;