import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

// Create Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder', // User should put their key here
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
});

export default razorpay;
