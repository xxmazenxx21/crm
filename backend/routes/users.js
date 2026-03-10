import express from 'express';
import { getUsers, getCurrentUser, getUsersByRole } from '../controllers/usersController.js';
import { isAuthenticatedHeader } from '../middleware/auth.js';
import { authorizeRole } from '../middleware/roleCheck.js';

const router = express.Router();

// Require authentication
router.use(isAuthenticatedHeader);

// Get current user (all authenticated users)
router.get('/me', getCurrentUser);

// Manager only routes
router.get('/', authorizeRole('manager'), getUsers);
router.get('/role/:role', authorizeRole('manager'), getUsersByRole);

export default router;
