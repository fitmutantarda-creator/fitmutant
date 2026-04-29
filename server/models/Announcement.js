import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: '#FF6B35' // Orange
  },
  textColor: {
    type: String,
    default: '#FFFFFF' // White
  },
  emoji: {
    type: String,
    default: '🎉'
  }
}, { timestamps: true });

export default mongoose.model('Announcement', announcementSchema);
