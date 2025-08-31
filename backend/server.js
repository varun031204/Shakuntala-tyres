const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Production CORS configuration
const corsOptions = {
  origin: [
    'https://shakuntalatyres.shop',
    'https://www.shakuntalatyres.shop', 
    'https://admin.shakuntalatyres.shop',
    'https://shakuntala-tyres-react-mqm8tc5vy-varuns-projects-7a8c6b22.vercel.app',
    /.*\.vercel\.app$/,
    'http://localhost:3000' // For development
  ],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Shakuntala Tyres Backend API', 
    status: 'OK', 
    timestamp: new Date().toISOString() 
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/tyres', require('./routes/tyres'));
app.use('/api/admin', require('./routes/admin'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});