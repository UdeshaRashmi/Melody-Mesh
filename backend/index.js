require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Connect to MongoDB (if MONGODB_URI is set)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
