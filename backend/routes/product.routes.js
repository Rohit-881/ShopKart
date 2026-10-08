import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
} from '../controllers/product.controller.js';

const router = express.Router();

// Route to get all products (Tasks 3 and 5)
// and Route to create a new product (Task 2)
router.route('/').get(getAllProducts).post(createProduct);

// Route to get a single product by ID (Task 4)
router.route('/:id').get(getProductById);

export default router;
