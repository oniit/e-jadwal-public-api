require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Booking = require('./models/booking');
const Asset = require('./models/asset');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// connect Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Public API connected to MongoDB Atlas'))
  .catch(err => {
    console.error('Mongo connection error:', err);
    process.exit(1);
  });

// GET /api/bookings (read-only)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/assets (read-only, bentuk sama seperti assets.json)
app.get('/api/assets', async (req, res) => {
  try {
    const assets = await Asset.find({});
    const grouped = {
      gedung: assets.filter(a => a.tipe === 'gedung'),
      kendaraan: assets.filter(a => a.tipe === 'kendaraan'),
      supir: assets.filter(a => a.tipe === 'supir')
    };
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// tidak ada POST/PUT/DELETE
app.listen(PORT, () => {
  console.log(`Public read-only API running on port ${PORT}`);
});

module.exports = app;