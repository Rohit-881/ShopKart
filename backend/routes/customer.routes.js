import express from 'express';
const router = express.Router();
import {
  registerCustomer,
  loginCustomer,
  getMyProfile,
  logoutCustomer,
  changePassword
} from '../controllers/customer.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

router.post('/register', registerCustomer);
router.post('/login', loginCustomer);
router.get('/me', protect, getMyProfile);
router.post('/logout', protect, logoutCustomer);
router.patch('/change-password', protect, changePassword);

export default router;
