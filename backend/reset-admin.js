const mongoose = require('mongoose');
const Admin = require('./models/Admin');

async function resetAdmin() {
  try {
    await mongoose.connect('mongodb://localhost:27017/shakuntala-tyres');
    
    // Delete existing admin
    await Admin.deleteMany({});
    
    // Create new admin
    const admin = new Admin({
      username: 'admin',
      password: 'admin123'
    });
    
    await admin.save();
    console.log('Admin created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

resetAdmin();