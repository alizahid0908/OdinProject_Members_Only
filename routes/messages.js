import express from 'express';
import { getNewMessage, createMessage, deleteMessage } from '../controllers/messageController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/new', isAuthenticated, getNewMessage);
router.post('/create', isAuthenticated, createMessage);
router.post('/delete/:id', isAuthenticated, deleteMessage);

export default router;