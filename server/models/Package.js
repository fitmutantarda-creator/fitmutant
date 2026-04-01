import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Kilo Alma', 'Kilo Verme', 'Sporcu Beslenmesi']
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  image: {
    type: String, // Base64 or URL
    default: ''
  },
  features: {
    type: [String],
    default: []
  }
}, { timestamps: true });

export default mongoose.model('Package', packageSchema);
