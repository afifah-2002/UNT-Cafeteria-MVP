const Cafe = require('../models/cafeModel.js');
const Category = require('../models/categoryModel.js');
const Item = require('../models/itemModel.js');
const AddOn = require('../models/addOnModel'); // adjust the path if needed



// @desc    Get all cafes
// @route   GET /api/cafes
// @access  Public
exports.getAllCafes = async (req, res) => {
    try {
        const cafes = await Cafe.find().select('-categories -__v');
        res.json(cafes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get categories for a specific cafe
// @route   GET /api/cafes/:cafeId/categories
// @access  Public
exports.getCategoriesByCafe = async (req, res) => {
    try {
        const cafeId = req.params.cafeId;
        const cafe = await Cafe.findById(cafeId).populate('categories', 'name imageUrl');

        if (!cafe) {
            return res.status(404).json({ message: 'Cafe not found' });
        }


        res.json(cafe.categories);
    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Cafe ID format' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get items for a specific category
// @route   GET /api/categories/:categoryId/items
// @access  Public
exports.getItemsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    
    const items = await Item.find({ category: categoryId })
      .select('name description price imageUrl'); 

    if (!items || items.length === 0) {
      return res.status(404).json({ message: 'No items found for this category or category does not exist' });
    }

    res.json(items);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid Category ID format' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a specific item by ID
// @route   GET /api/items/:itemId
// @access  Public
exports.getItemById = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const item = await Item.findById(itemId).select('name description price imageUrl category');

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Item ID format' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new cafe
// @route   POST /api/cafes
// @access  Public (for initial data population, would likely require auth in production)
exports.createCafe = async (req, res) => {
    try {
        const newCafe = new Cafe(req.body);
        const savedCafe = await newCafe.save();
        res.status(201).json(savedCafe);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

// @desc    Create a new category for a cafe
// @route   POST /api/cafes/:cafeId/categories
// @access  Public (for initial data population, would likely require auth in production)
exports.createCategoryForCafe = async (req, res) => {
    try {
        // console.log(req.body)
        const cafeId = req.params.cafeId;
        const cafe = await Cafe.findById(cafeId);

        if (!cafe) {
            return res.status(404).json({ message: 'Cafe not found' });
        }

        const newCategory = new Category({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            cafe: cafeId
        });

        const savedCategory = await newCategory.save();
        cafe.categories.push(savedCategory._id);
        await cafe.save();

        res.status(201).json(savedCategory);
    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Cafe ID format' });
        }
        res.status(400).json({ message: err.message });
    }
};

// @desc    Create a new item for a category
// @route   POST /api/categories/:categoryId/items
// @access  Public (for initial data population, would likely require auth in production)
exports.createItemForCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const cafe = await Cafe.findById(category.cafe);
        if (!cafe) {
            return res.status(500).json({ message: 'Parent cafe not found for category' });
        }

        const newItem = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: categoryId,
            cafe: cafe._id
        });

        const savedItem = await newItem.save();
        category.items.push(savedItem._id);
        await category.save();

        res.status(201).json(savedItem);
    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Category ID format' });
        }
        res.status(400).json({ message: err.message });
    }
};



// @desc    Create a new add-on for a category
// @route   POST /api/categories/:categoryId/addons
// @access  Public (you can protect it later)
exports.createAddOn = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Optional: Validate category existence
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const { name, price } = req.body;

    const newAddOn = new AddOn({
      name,
      price,
      category: categoryId,
    });

    const savedAddOn = await newAddOn.save();
    res.status(201).json(savedAddOn);
  } catch (err) {
    console.error('Error creating add-on:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all add-ons for a specific category
// @route   GET /api/categories/:categoryId/addons
// @access  Public
exports.getAddOnsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const addOns = await AddOn.find({ category: categoryId }).select('name price');

    res.json(addOns);
  } catch (err) {
    console.error('Error fetching add-ons:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
