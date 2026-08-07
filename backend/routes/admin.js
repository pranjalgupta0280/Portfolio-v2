const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { Profile, Skill, Education, Achievement, DsaProfile, Project, Message } = require('../models/schemas');

// Apply auth middleware to all admin routes
router.use(verifyToken);

// --- Profile Routes ---
router.put('/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    await profile.save();
    res.json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

// --- Skills Routes ---
router.post('/skills', async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create skill', error: error.message });
  }
});

router.put('/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update skill', error: error.message });
  }
});

router.delete('/skills/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete skill', error: error.message });
  }
});

// --- Education Routes ---
router.post('/education', async (req, res) => {
  try {
    const edu = new Education(req.body);
    await edu.save();
    res.status(201).json(edu);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add education', error: error.message });
  }
});

router.put('/education/:id', async (req, res) => {
  try {
    const edu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(edu);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update education', error: error.message });
  }
});

router.delete('/education/:id', async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Education entry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete education', error: error.message });
  }
});

// --- Achievements Routes ---
router.post('/achievements', async (req, res) => {
  try {
    const ach = new Achievement(req.body);
    await ach.save();
    res.status(201).json(ach);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add achievement', error: error.message });
  }
});

router.put('/achievements/:id', async (req, res) => {
  try {
    const ach = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ach);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update achievement', error: error.message });
  }
});

router.delete('/achievements/:id', async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Achievement deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete achievement', error: error.message });
  }
});

// --- DSA Profiles Routes ---
router.post('/dsa', async (req, res) => {
  try {
    const dsa = new DsaProfile(req.body);
    await dsa.save();
    res.status(201).json(dsa);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add DSA profile', error: error.message });
  }
});

router.put('/dsa/:id', async (req, res) => {
  try {
    const dsa = await DsaProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(dsa);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update DSA profile', error: error.message });
  }
});

router.delete('/dsa/:id', async (req, res) => {
  try {
    await DsaProfile.findByIdAndDelete(req.params.id);
    res.json({ message: 'DSA profile deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete DSA profile', error: error.message });
  }
});

// --- Projects Routes ---
router.post('/projects', async (req, res) => {
  try {
    const proj = new Project(req.body);
    await proj.save();
    res.status(201).json(proj);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create project', error: error.message });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const proj = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(proj);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update project', error: error.message });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
});

// --- Messages Routes ---
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
});

router.put('/messages/:id/read', async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark message as read', error: error.message });
  }
});

router.delete('/messages/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete message', error: error.message });
  }
});

module.exports = router;
