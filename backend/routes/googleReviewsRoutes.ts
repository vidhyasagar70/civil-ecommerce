import express from 'express';
import { getGoogleReviews } from '../controllers/googleReviewsController';

const router = express.Router();

// Public route to get Google Reviews
router.get('/', getGoogleReviews);

export default router;