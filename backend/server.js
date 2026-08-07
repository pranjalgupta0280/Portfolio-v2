const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

// Ensure IPv4 first & Google/Cloudflare DNS lookup for Atlas querySrv on Windows
try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}



const publicRoutes = require('./routes/public');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Root Health Check
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API Backend is active and running.' });
});

// Database Connection & Server Start
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
  } catch (err) {
    console.error(`Failed to connect to primary MongoDB (${MONGO_URI}):`, err.message);
    if (MONGO_URI !== 'mongodb://127.0.0.1:27017/portfolio') {
      console.log('Attempting fallback to local MongoDB (mongodb://127.0.0.1:27017/portfolio)...');
      try {
        await mongoose.connect('mongodb://127.0.0.1:27017/portfolio');
        console.log('Connected to fallback local MongoDB at mongodb://127.0.0.1:27017/portfolio');
      } catch (localErr) {
        console.error('Failed to connect to fallback local MongoDB:', localErr.message);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
});

