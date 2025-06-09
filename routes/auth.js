import express from 'express';
import { signup, getLogin, login, logout, getSignup } from '../controllers/authController.js';
import { validateSignup } from '../middleware/validate.js';

const router = express.Router();

router.get('/signup', getSignup);
router.post('/signup', validateSignup, signup);
router.get('/login', getLogin);
router.post('/login', login);
router.get('/logout', logout);

export default router;