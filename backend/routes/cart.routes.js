import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart
} from '../controllers/cart.controller.js';

const router = express.Router();

// All cart routes are protected
router.use(protect);

router.route('/')
  .get(getCart);

router.route('/:productId')
  .post(addToCart)
  .patch(updateCartQuantity)
  .delete(removeFromCart);

export default router;
