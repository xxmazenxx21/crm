import express from 'express';
import { login, logout, register } from '../controllers/authController.js';
import { isAuthenticatedHeader } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', isAuthenticatedHeader, logout);

export default router;
