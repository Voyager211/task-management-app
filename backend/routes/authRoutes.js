import express from 'express';
import {
  register,
  login,
  logout,
  refresh,
  getProfile,
  updateProfile
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refresh);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
