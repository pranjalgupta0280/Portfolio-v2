const mongoose = require('mongoose');

// Profile Schema
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  shortIntro: { type: String, required: true },
  bio: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  coverImageUrl: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  twitterUrl: { type: String, default: '' }
}, { timestamps: true });

// Skill Schema
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Frontend', 'Backend', 'Database', 'DevOps & Cloud', 'Languages & CS', 'Tools & Others'], required: true },
  proficiency: { type: Number, min: 1, max: 100, default: 85 },
  icon: { type: String, default: 'Code' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Education Schema
const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  duration: { type: String, required: true },
  grade: { type: String, default: '' },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Achievement Schema
const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, default: '' },
  year: { type: String, default: '' },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// DSA Profile Schema
const dsaProfileSchema = new mongoose.Schema({
  platform: { type: String, required: true }, // e.g. Codeforces, LeetCode, CodeChef, GitHub, GeeksforGeeks
  handle: { type: String, required: true },
  profileUrl: { type: String, required: true },
  rating: { type: String, default: '' },
  maxRating: { type: String, default: '' },
  rank: { type: String, default: '' },
  solvedCount: { type: String, default: '0' },
  badge: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  description: { type: String, required: true },
  fullDescription: { type: String, default: '' },
  imageUrl: { type: String, required: true },
  category: { type: String, default: 'Full Stack' },
  techStack: [{ type: String }],
  githubUrl: { type: String, default: '' },
  liveDemoUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Message Schema
const messageSchema = new mongoose.Schema({
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  subject: { type: String, default: 'Portfolio Contact' },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }
}, { timestamps: true });

// Admin Schema
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = {
  Profile: mongoose.model('Profile', profileSchema),
  Skill: mongoose.model('Skill', skillSchema),
  Education: mongoose.model('Education', educationSchema),
  Achievement: mongoose.model('Achievement', achievementSchema),
  DsaProfile: mongoose.model('DsaProfile', dsaProfileSchema),
  Project: mongoose.model('Project', projectSchema),
  Message: mongoose.model('Message', messageSchema),
  Admin: mongoose.model('Admin', adminSchema)
};
