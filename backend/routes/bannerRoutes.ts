// FILE: routes/bannerRoutes.ts
// ============================================
import express from 'express';
import Banner from '../models/Banner';
import { authenticate, requireAdmin } from '../middlewares/auth';

const router = express.Router();

// Get active banners for a specific position (public route)
router.get('/active/:position', async (req, res) => {
  try {
    const { position } = req.params;
    const now = new Date();

    const query: any = {
      status: 'Active',
      startDate: { $lte: now },
      endDate: { $gte: now },
    };

    // Filter by position
    if (position === 'home') {
      query.$or = [{ position: 'Home Page Only' }, { position: 'Both' }];
    } else if (position === 'product') {
      query.$or = [{ position: 'Product Page' }, { position: 'Both' }];
    }

    const banners = await Banner.find(query)
      .sort({ priority: -1, createdAt: -1 })
      .limit(5);

    res.json(banners);
  } catch (error) {
    console.error('Error fetching active banners:', error);
    res.status(500).json({ message: 'Error fetching banners' });
  }
});

// Get all banners (admin only)
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const banners = await Banner.find().sort({ priority: -1, createdAt: -1 });
    res.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ message: 'Error fetching banners' });
  }
});

// Get single banner (admin only)
router.get('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.json(banner);
  } catch (error) {
    console.error('Error fetching banner:', error);
    res.status(500).json({ message: 'Error fetching banner' });
  }
});

// Create banner (admin only)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const banner = new Banner(req.body);
    await banner.save();
    res.status(201).json(banner);
  } catch (error) {
    console.error('Error creating banner:', error);
    res.status(500).json({ message: 'Error creating banner' });
  }
});

// Update banner (admin only)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    
    res.json(banner);
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ message: 'Error updating banner' });
  }
});

// Delete banner (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    
    res.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ message: 'Error deleting banner' });
  }
});

export default router;
