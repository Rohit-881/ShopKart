import Customer from '../models/customer.model.js';
import Product from '../models/product.model.js';

// @desc    Add product to cart
// @route   POST /cart/:productId
// @access  Private
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.stock < 1) {
      return res.status(400).json({ success: false, message: 'Product is out of stock' });
    }

    const user = await Customer.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Check if product already in cart
    const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);

    if (cartItemIndex > -1) {
      // Product exists in cart, increment quantity
      if (user.cart[cartItemIndex].quantity + 1 > product.stock) {
        return res.status(400).json({ success: false, message: 'Cannot exceed available stock' });
      }
      user.cart[cartItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      user.cart.push({ product: productId, quantity: 1 });
    }

    await user.save();
    
    // Return updated cart
    const updatedUser = await Customer.findById(req.user._id).populate({
      path: 'cart.product',
      select: 'name price image stock category'
    });

    res.status(200).json({ 
      success: true, 
      message: 'Cart updated',
      cart: updatedUser.cart 
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get user cart
// @route   GET /cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    const user = await Customer.findById(req.user._id).populate({
      path: 'cart.product',
      select: 'name price image stock category'
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Filter out items where product is null (e.g., product was deleted)
    const validCart = user.cart.filter(item => item.product != null);
    
    if (validCart.length !== user.cart.length) {
      user.cart = validCart;
      await user.save();
    }

    res.status(200).json({
      success: true,
      cart: validCart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update cart item quantity
// @route   PATCH /cart/:productId
// @access  Private
export const updateCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ success: false, message: 'Valid quantity (>= 1) is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ success: false, message: 'Cannot exceed available stock' });
    }

    const user = await Customer.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    const cartItem = user.cart.find(item => item.product.toString() === productId);
    
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Product not in cart' });
    }

    cartItem.quantity = quantity;
    await user.save();

    const updatedUser = await Customer.findById(req.user._id).populate({
      path: 'cart.product',
      select: 'name price image stock category'
    });

    res.status(200).json({ 
      success: true, 
      message: 'Cart quantity updated',
      cart: updatedUser.cart
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Remove product from cart
// @route   DELETE /cart/:productId
// @access  Private
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await Customer.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);
    
    if (cartItemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not in cart' });
    }

    user.cart.splice(cartItemIndex, 1);
    await user.save();

    const updatedUser = await Customer.findById(req.user._id).populate({
      path: 'cart.product',
      select: 'name price image stock category'
    });

    res.status(200).json({ 
      success: true, 
      message: 'Product removed from cart',
      cart: updatedUser.cart
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
