require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Contact routes
const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contact', contactRoutes);

// Event routes
const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Initialize special admin user
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  // Initialize the special admin user
  await userRoutes.initializeSpecialAdmin();
});