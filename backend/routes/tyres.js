const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Tyre = require('../models/Tyre');
const router = express.Router();

// Multer config for memory storage (Cloudinary upload)
const upload = multer({ 
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files allowed'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { 
        folder: 'shakuntala-tyres',
        resource_type: 'image'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    ).end(buffer);
  });
};

// Get all tyres
router.get('/', async (req, res) => {
  try {
    const { brand, status } = req.query;
    const filter = {};
    if (brand) filter.brand = brand;
    if (status) filter.status = status;
    
    const tyres = await Tyre.find(filter).sort({ createdAt: -1 });
    res.json(tyres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single tyre
router.get('/:id', async (req, res) => {
  try {
    const tyre = await Tyre.findById(req.params.id);
    if (!tyre) return res.status(404).json({ message: 'Tyre not found' });
    res.json(tyre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new tyre
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = null;
    
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }
    
    const tyreData = {
      ...req.body,
      image: imageUrl
    };
    
    const tyre = new Tyre(tyreData);
    await tyre.save();
    res.status(201).json(tyre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update tyre
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (req.file) {
      updateData.image = await uploadToCloudinary(req.file.buffer);
    }
    
    const tyre = await Tyre.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!tyre) return res.status(404).json({ message: 'Tyre not found' });
    res.json(tyre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete tyre
router.delete('/:id', async (req, res) => {
  try {
    const tyre = await Tyre.findByIdAndDelete(req.params.id);
    if (!tyre) return res.status(404).json({ message: 'Tyre not found' });
    res.json({ message: 'Tyre deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;