const mongoose = require('mongoose');

const tyreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  size: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  category: { type: String, default: 'car' },
  features: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Tyre', tyreSchema);