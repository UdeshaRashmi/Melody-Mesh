const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  dob: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  event: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'registered'], default: 'registered' }
});

module.exports = mongoose.model('User', userSchema);
