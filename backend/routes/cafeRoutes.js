const express = require('express');
const router = express.Router();
const cafeController = require('../controllers/cafeController.js');

// @route   GET /api/cafes
// @desc    Get all cafes
router.get('/cafes', cafeController.getAllCafes);

// @route   GET /api/cafes/:cafeId/categories
// @desc    Get categories for a specific cafe
router.get('/cafes/:cafeId/categories', cafeController.getCategoriesByCafe);

// @route   GET /api/categories/:categoryId/items
// @desc    Get items for a specific category
router.get('/categories/:categoryId/items', cafeController.getItemsByCategory);

// @route   GET /api/items/:itemId
// @desc    Get a specific item by ID
router.get('/items/:itemId', cafeController.getItemById);

// @route   POST /api/cafes
// @desc    Create a new cafe
router.post('/cafes', cafeController.createCafe);

// @route   POST /api/cafes/:cafeId/categories
// @desc    Create a new category for a cafe
router.post('/cafes/:cafeId/categories', cafeController.createCategoryForCafe);

// @route   POST /api/categories/:categoryId/items
// @desc    Create a new item for a category
router.post('/categories/:categoryId/items', cafeController.createItemForCategory);

module.exports = router;
