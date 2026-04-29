import express from 'express';
import {
  getAnnouncements,
  getActiveAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} from '../controllers/announcementController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route - get active announcements
router.get('/active', getActiveAnnouncements);

// Admin routes
router.get('/', protectAdmin, getAnnouncements);
router.post('/', protectAdmin, createAnnouncement);
router.put('/:id', protectAdmin, updateAnnouncement);
router.delete('/:id', protectAdmin, deleteAnnouncement);

export default router;
