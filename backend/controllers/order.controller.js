import crypto from 'crypto';
import Order from '../models/order.model.js';
import Customer from '../models/customer.model.js';
import Product from '../models/product.model.js';
import razorpay from '../config/razorpay.js';

// @desc    Create an order and Razorpay payment instance
// @route   POST /orders/create-payment-order
// @access  Private
export const createPaymentOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    
    // Validate shipping address
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.pincode) {
      return res.status(400).json({ success: false, message: 'All shipping fields are required.' });
    }

    const user = await Customer.findById(req.user._id).populate('cart.product');
    
    if (!user || !user.cart || user.cart.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Final Stock Verification and Price Calculation
    for (const cartItem of user.cart) {
      const product = cartItem.product; // Already populated
      
      if (!product) {
        return res.status(400).json({ success: false, message: 'A product in your cart no longer exists.' });
      }

      // Check stock
      if (cartItem.quantity > product.stock) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}.` });
      }

      // Calculate total securely on backend
      totalAmount += product.price * cartItem.quantity;

      // Create snapshot
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: cartItem.quantity,
        image: product.image
      });
    }

    // Create the ShopKart pending order
    const shopKartOrder = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      totalAmount,
      status: 'PENDING_PAYMENT',
      paymentStatus: 'PENDING'
    });

    // Create Razorpay order
    const amountInPaise = Math.round(totalAmount * 100);
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: shopKartOrder._id.toString()
    });

    // Save Razorpay order ID
    shopKartOrder.razorpayOrderId = razorpayOrder.id;
    await shopKartOrder.save();

    // Return checkout details safely
    res.status(200).json({
      success: true,
      shopKartOrderId: shopKartOrder._id,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: 'INR',
      key: process.env.RAZORPAY_KEY_ID 
    });

  } catch (error) {
    console.error('Create Payment Order Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Verify Razorpay payment signature
// @route   POST /orders/verify-payment
// @access  Private
export const verifyPayment = async (req, res) => {
  try {
    const { shopKartOrderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const order = await Order.findOne({ _id: shopKartOrderId, user: req.user._id });
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.razorpayOrderId !== razorpay_order_id) {
       return res.status(400).json({ success: false, message: 'Order ID mismatch' });
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Signature matches, update order
    order.paymentStatus = 'PAID';
    order.status = 'PLACED';
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    // Update Product Stock (Deduct)
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    // Clear user cart
    const user = await Customer.findById(req.user._id);
    user.cart = [];
    await user.save();

    res.status(200).json({ success: true, message: 'Payment successful', order });
  } catch (error) {
    console.error('Verify Payment Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get logged in user orders
// @route   GET /orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get order by ID
// @route   GET /orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    // Check ownership
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid order ID format' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
