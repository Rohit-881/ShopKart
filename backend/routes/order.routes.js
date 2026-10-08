import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  createPaymentOrder,
  verifyPayment,
  getMyOrders,
  getOrderById,
  failPayment
} from '../controllers/order.controller.js';

const router = express.Router();

// All order routes are protected
router.use(protect);

router.post('/create-payment-order', createPaymentOrder);
router.post('/verify-payment', verifyPayment);

router.route('/')
  .get(getMyOrders);

router.route('/:id')
  .get(getOrderById);

router.patch('/:id/fail', failPayment);

export default router;
