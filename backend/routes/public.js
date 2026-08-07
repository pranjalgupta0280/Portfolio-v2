const express = require('express');
const router = express.Router();
const { Profile, Skill, Education, Achievement, DsaProfile, Project, Message } = require('../models/schemas');

// Get all consolidated portfolio public data
router.get('/portfolio', async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 });
    const education = await Education.find().sort({ order: 1, createdAt: 1 });
    const achievements = await Achievement.find().sort({ order: 1, createdAt: 1 });
    const dsaProfiles = await DsaProfile.find().sort({ order: 1, createdAt: 1 });
    const projects = await Project.find().sort({ order: 1, createdAt: 1 });

    res.json({
      profile: profile || {},
      skills,
      education,
      achievements,
      dsaProfiles,
      projects
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio data', error: error.message });
  }
});

// Submit contact form message
router.post('/contact', async (req, res) => {
  try {
    const { senderName, senderEmail, subject, message } = req.body;
    if (!senderName || !senderEmail || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required fields.' });
    }

    const newMessage = new Message({
      senderName,
      senderEmail,
      subject: subject || 'Portfolio Contact Message',
      message
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
});

module.exports = router;
