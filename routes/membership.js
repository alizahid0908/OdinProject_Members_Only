import express from 'express';
import { getJoinClub, joinClub } from '../controllers/membershipController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/join-club', isAuthenticated, getJoinClub);
router.post('/join', isAuthenticated, joinClub);

export default router;