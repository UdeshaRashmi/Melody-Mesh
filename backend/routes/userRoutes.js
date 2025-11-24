const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Special admin credentials
const SPECIAL_ADMIN_USERNAME = 'melodyadmin';
const SPECIAL_ADMIN_PASSWORD = 'Melody@2025!';
const SPECIAL_ADMIN_NAME = 'Melody Mesh Admin';
const SPECIAL_ADMIN_EMAIL = 'admin@melodysystem.com';

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }
    
    // Check for special admin credentials
    if (username === SPECIAL_ADMIN_USERNAME && password === SPECIAL_ADMIN_PASSWORD) {
      return res.json({ 
        success: true, 
        role: 'admin', 
        token: 'special-admin-token', 
        user: { username: SPECIAL_ADMIN_USERNAME, name: SPECIAL_ADMIN_NAME } 
      });
    }
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }
    // Use user.role from database
    res.json({ success: true, role: user.role, token: 'dummy-token', user: { username: user.username, name: user.name } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, username, dob, email, phone, event, password } = req.body;
    console.log('Register request body:', req.body);
    if (!name || !username || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'Name, username, email, and password are required.' });
    }
    
    // Prevent creation of special admin username
    if (username === SPECIAL_ADMIN_USERNAME) {
      return res.status(400).json({ error: 'This username is reserved.' });
    }
    
    // Set role to 'admin' if username is 'admin', else 'registered'
    const role = username === 'admin' ? 'admin' : 'registered';
    const newUser = new User({ name, username, dob, email, phone, event, password, role });
    await newUser.save();
    console.log('User registered:', newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Initialize special admin user (this will run when the server starts)
router.initializeSpecialAdmin = async () => {
  try {
    // Check if special admin already exists in database
    const existingAdmin = await User.findOne({ username: SPECIAL_ADMIN_USERNAME });
    if (!existingAdmin) {
      // Create a database entry for the special admin as backup
      const adminUser = new User({
        name: SPECIAL_ADMIN_NAME,
        username: SPECIAL_ADMIN_USERNAME,
        email: SPECIAL_ADMIN_EMAIL,
        password: SPECIAL_ADMIN_PASSWORD,
        role: 'admin'
      });
      await adminUser.save();
      console.log('Special admin user created in database as backup');
    } else {
      // Update the existing admin user with special credentials
      await User.updateOne(
        { username: SPECIAL_ADMIN_USERNAME },
        { 
          name: SPECIAL_ADMIN_NAME,
          email: SPECIAL_ADMIN_EMAIL,
          password: SPECIAL_ADMIN_PASSWORD,
          role: 'admin'
        }
      );
      console.log('Special admin user updated in database');
    }
  } catch (err) {
    console.error('Error initializing special admin:', err.message);
  }
};

module.exports = router;