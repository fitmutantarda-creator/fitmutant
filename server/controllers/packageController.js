import Package from '../models/Package.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
export const getPackages = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }
    const packages = await Package.find(query);
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new package
// @route   POST /api/packages
// @access  Public/Admin
export const createPackage = async (req, res) => {
  try {
    // Eğer image URL'i varsa, bunu imgURL'e aktar
    const packageData = {
      ...req.body,
      imgURL: req.body.imgURL || req.body.image || '',
    };

    const newPackage = await Package.create(packageData);
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Public/Admin
export const updatePackage = async (req, res) => {
  try {
    const updatedData = { ...req.body };

    // Yeni imgURL varsa, eski image Cloudinary'den sil (opsiyonel)
    const existingPackage = await Package.findById(req.params.id);
    
    if (updatedData.imgURL && existingPackage.imgURL !== updatedData.imgURL) {
      // Eğer eski URL Cloudinary'deyse, silebiliriz (optional)
      // Bu kısım isteğe bağlıdır
    }

    // imgURL'i güncelle
    if (updatedData.imgURL) {
      updatedData.imgURL = updatedData.imgURL;
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a package
// @route   DELETE /api/packages/:id
// @access  Public/Admin
export const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);

    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Cloudinary'den image'ı sil (opsiyonel)
    // Eğer imgURL varsa ve Cloudinary'den geliyorsa silebiliriz

    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
