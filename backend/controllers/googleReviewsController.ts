import { Request, Response } from 'express';
import googleReviewsService from '../services/googleReviewsService';

export const getGoogleReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await googleReviewsService.getReviews();
        res.json(reviews);
    } catch (error) {
        console.error('Error in getGoogleReviews:', error);
        res.status(500).json({
            error: 'Failed to fetch reviews',
            message: 'Unable to load Google Reviews at this time. Please try again later.'
        });
    }
};