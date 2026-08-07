const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

// Ensure IPv4 first & Google/Cloudflare DNS lookup for Atlas querySrv on Windows & Render
try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) { }

const publicRoutes = require('./routes/public');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Enable CORS for Vercel live domain and local development
const allowedOrigins = [
  'https://portfolio-v2-ten-delta-45.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint for Render
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API Backend is active and running on Render.' });
});

// Database Connection & Server Start
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB `);
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

const bcrypt = require('bcryptjs');
const { Admin } = require('./models/schemas');

// Sync Admin credentials from .env to MongoDB
const ensureAdminAccount = async () => {
  try {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await Admin.deleteMany({});
    await Admin.create({
      username: adminUsername,
      password: hashedPassword
    });
    console.log(`Admin credentials synced to MongoDB for username: ${adminUsername}`);
  } catch (err) {
    console.error('Failed to sync admin credentials:', err.message);
  }
};

connectDB().then(async () => {
  await ensureAdminAccount();
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
});

