const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact - create a new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
