import Product from '../models/product.model.js';

// Task 2 - Create Product API
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;

    // Validate required fields
    if (!name || !description || price === undefined || !category || !image || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Validate price and stock
    if (price <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid price. Must be greater than 0.',
      });
    }

    if (stock < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid stock. Cannot be negative.',
      });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      image,
      stock,
    });

    return res.status(201).json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Task 3 & 5 - Get All Products API (with Search and Category Filtering)
export const getAllProducts = async (req, res) => {
  try {
    const { search, category, sort } = req.query;
    
    // Build the query object dynamically
    const query = {};

    // Apply search filter if provided
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive regex match
    }

    // Apply category filter if provided
    if (category) {
      query.category = category;
    }

    // Determine sort object
    let sortObj = {};
    if (sort === 'price_asc') {
      sortObj.price = 1;
    } else if (sort === 'price_desc') {
      sortObj.price = -1;
    }

    const products = await Product.find(query).sort(sortObj);

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Task 4 - Get Single Product API
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: basic validation to check if ID is a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID',
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('Error fetching single product:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
