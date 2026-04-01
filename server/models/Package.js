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
  imgURL: {
    type: String, // Cloudinary URL
    default: ''
  },
  image: {
    type: String, // Eski verileri uyumlu tutmak için
    default: ''
  },
  features: {
    type: [String],
    default: []
  }
}, { timestamps: true });

export default mongoose.model('Package', packageSchema);
