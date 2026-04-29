import Announcement from '../models/Announcement.js';

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getActiveAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ active: true });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, color, textColor, emoji } = req.body;
    
    const announcement = new Announcement({
      title,
      message,
      color: color || '#FF6B35',
      textColor: textColor || '#FFFFFF',
      emoji: emoji || '🎉'
    });
    
    await announcement.save();
    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, active, color, textColor, emoji } = req.body;
    
    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { title, message, active, color, textColor, emoji },
      { new: true, runValidators: true }
    );
    
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    
    res.json(announcement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findByIdAndDelete(id);
    
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    
    res.json({ message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
