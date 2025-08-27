const express = require('express');
const multer = require('multer');
const path = require('path');
const Tyre = require('../models/Tyre');
const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files allowed'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

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
    const tyreData = {
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : null
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
      updateData.image = `/uploads/${req.file.filename}`;
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