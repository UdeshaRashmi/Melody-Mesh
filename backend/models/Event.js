const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  type: { type: String, enum: ['upcoming', 'past'], required: true },
  createdBy: { type: String }, // admin username
});

module.exports = mongoose.model('Event', eventSchema);
