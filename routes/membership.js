import express from 'express';
import { getJoinClub, joinClub } from '../controllers/membershipController.js';

const router = express.Router();

router.get('/join-club', getJoinClub);
router.post('/join-club', joinClub);

export default router;