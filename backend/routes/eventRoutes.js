const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get events created by melodyadmin
router.get('/admin/melodyadmin', async (req, res) => {
  try {
    const events = await Event.find({ createdBy: 'melodyadmin' });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get upcoming events created by melodyadmin
router.get('/admin/melodyadmin/upcoming', async (req, res) => {
  try {
    const events = await Event.find({ createdBy: 'melodyadmin', type: 'upcoming' });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get past events created by melodyadmin
router.get('/admin/melodyadmin/past', async (req, res) => {
  try {
    const events = await Event.find({ createdBy: 'melodyadmin', type: 'past' });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new event
router.post('/', async (req, res) => {
  try {
    const { title, description, date, type, createdBy } = req.body;
    if (!title || !date || !type) {
      return res.status(400).json({ error: 'Title, date, and type are required.' });
    }
    const event = new Event({ title, description, date, type, createdBy });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update event
router.put('/:id', async (req, res) => {
  try {
    const { title, description, date, type } = req.body;
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date, type },
      { new: true }
    );
    if (!event) return res.status(404).json({ error: 'Event not found.' });
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found.' });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;