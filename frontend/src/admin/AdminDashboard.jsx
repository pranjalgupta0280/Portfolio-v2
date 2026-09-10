import React, { useState, useEffect } from 'react';
import {
  User, Code2, Trophy, FolderPlus, MessageSquare, LogOut, Check, Trash2, Edit3, Plus,
  Sparkles, Save, ShieldCheck, ArrowLeft, RefreshCw, Layers, GraduationCap, Award, BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminDashboard({ onClose }) {
  const { logout, getAuthHeader } = useAuth();
  const { data, refreshData } = usePortfolio();

  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState(null);

  // Editable Form States
  const [profileForm, setProfileForm] = useState(data.profile || {});
  
  // Projects Editor State
  const [projectsList, setProjectsList] = useState(data.projects || []);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '', subtitle: '', description: '', fullDescription: '', imageUrl: '',
    category: 'Full Stack', techStack: '', githubUrl: '', liveDemoUrl: '', featured: false
  });

  // Blogs Editor State
  const [blogsList, setBlogsList] = useState(data.blogs || []);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '', subtitle: '', category: 'Engineering', readTime: '5 min read',
    coverImageUrl: '', tags: '', content: '', featured: false
  });

  // Skills Editor State
  const [skillsList, setSkillsList] = useState(data.skills || []);
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Frontend', proficiency: 85, icon: 'Code' });

  // DSA Profiles State
  const [dsaList, setDsaList] = useState(data.dsaProfiles || []);
  const [dsaForm, setDsaForm] = useState({ platform: 'Codeforces', handle: '', profileUrl: '', rating: '', solvedCount: '', badge: '' });

  // Education & Achievements State
  const [educationList, setEducationList] = useState(data.education || []);
  const [eduForm, setEduForm] = useState({ institution: '', degree: '', duration: '', grade: '', description: '' });
  const [achievementsList, setAchievementsList] = useState(data.achievements || []);
  const [achForm, setAchForm] = useState({ title: '', organization: '', year: '', description: '' });

  // Messages Inbox State
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setProfileForm(data.profile || {});
    setProjectsList(data.projects || []);
    setBlogsList(data.blogs || []);
    setSkillsList(data.skills || []);
    setDsaList(data.dsaProfiles || []);
    setEducationList(data.education || []);
    setAchievementsList(data.achievements || []);
  }, [data]);


  useEffect(() => {
    if (activeTab === 'messages') {
      fetchMessages();
    }
  }, [activeTab]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('/api/admin/messages', getAuthHeader());
      setMessages(res.data);
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  };

  const showNotification = (msg) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Helper to convert local image file (PNG/JPG) to URL
  const handleImageUpload = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // --- Profile Handler ---

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/admin/profile', profileForm, getAuthHeader());
      await refreshData();
      showNotification('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile: ' + (err.response?.data?.message || err.message));
    }
  };

  // --- Projects Handlers ---
  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      const techArray = typeof projectForm.techStack === 'string'
        ? projectForm.techStack.split(',').map(s => s.trim()).filter(Boolean)
        : projectForm.techStack;

      const payload = { ...projectForm, techStack: techArray };

      if (editingProject) {
        await axios.put(`/api/admin/projects/${editingProject._id}`, payload, getAuthHeader());
        showNotification('Project updated!');
      } else {
        await axios.post('/api/admin/projects', payload, getAuthHeader());
        showNotification('New project added!');
      }

      setEditingProject(null);
      setProjectForm({
        title: '', subtitle: '', description: '', fullDescription: '', imageUrl: '',
        category: 'Full Stack', techStack: '', githubUrl: '', liveDemoUrl: '', featured: false
      });
      await refreshData();
    } catch (err) {
      alert('Failed to save project: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await axios.delete(`/api/admin/projects/${id}`, getAuthHeader());
      await refreshData();
      showNotification('Project deleted!');
    } catch (err) {
      alert('Failed to delete project.');
    }
  };

  const startEditProject = (proj) => {
    setEditingProject(proj);
    setProjectForm({
      ...proj,
      techStack: Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack
    });
  };

  // --- Blogs Handlers ---
  const handleSaveBlog = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = typeof blogForm.tags === 'string'
        ? blogForm.tags.split(',').map(s => s.trim()).filter(Boolean)
        : blogForm.tags;

      const payload = { ...blogForm, tags: tagsArray };

      if (editingBlog) {
        await axios.put(`/api/admin/blogs/${editingBlog._id}`, payload, getAuthHeader());
        showNotification('Blog post updated!');
      } else {
        await axios.post('/api/admin/blogs', payload, getAuthHeader());
        showNotification('New blog post published!');
      }

      setEditingBlog(null);
      setBlogForm({
        title: '', subtitle: '', category: 'Engineering', readTime: '5 min read',
        coverImageUrl: '', tags: '', content: '', featured: false
      });
      await refreshData();
    } catch (err) {
      alert('Failed to save blog post: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await axios.delete(`/api/admin/blogs/${id}`, getAuthHeader());
      await refreshData();
      showNotification('Blog post deleted!');
    } catch (err) {
      alert('Failed to delete blog post.');
    }
  };

  const startEditBlog = (b) => {
    setEditingBlog(b);
    setBlogForm({
      ...b,
      tags: Array.isArray(b.tags) ? b.tags.join(', ') : b.tags
    });
  };

  // --- Skills Handlers ---
  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/skills', skillForm, getAuthHeader());
      setSkillForm({ name: '', category: 'Frontend', proficiency: 85, icon: 'Code' });
      await refreshData();
      showNotification('Skill added!');
    } catch (err) {
      alert('Failed to add skill.');
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await axios.delete(`/api/admin/skills/${id}`, getAuthHeader());
      await refreshData();
      showNotification('Skill deleted!');
    } catch (err) {
      alert('Failed to delete skill.');
    }
  };

  // --- DSA Handlers ---
  const handleAddDsa = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/dsa', dsaForm, getAuthHeader());
      setDsaForm({ platform: 'Codeforces', handle: '', profileUrl: '', rating: '', solvedCount: '', badge: '' });
      await refreshData();
      showNotification('DSA Profile added!');
    } catch (err) {
      alert('Failed to add DSA profile.');
    }
  };

  const handleDeleteDsa = async (id) => {
    try {
      await axios.delete(`/api/admin/dsa/${id}`, getAuthHeader());
      await refreshData();
      showNotification('DSA Profile deleted!');
    } catch (err) {
      alert('Failed to delete profile.');
    }
  };

  // --- Education & Achievements Handlers ---
  const handleAddEducation = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/education', eduForm, getAuthHeader());
      setEduForm({ institution: '', degree: '', duration: '', grade: '', description: '' });
      await refreshData();
      showNotification('Education entry added!');
    } catch (err) {
      alert('Failed to add education entry.');
    }
  };

  const handleDeleteEducation = async (id) => {
    try {
      await axios.delete(`/api/admin/education/${id}`, getAuthHeader());
      await refreshData();
      showNotification('Education entry deleted!');
    } catch (err) {
      alert('Failed to delete education.');
    }
  };

  const handleAddAchievement = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/achievements', achForm, getAuthHeader());
      setAchForm({ title: '', organization: '', year: '', description: '' });
      await refreshData();
      showNotification('Achievement added!');
    } catch (err) {
      alert('Failed to add achievement.');
    }
  };

  const handleDeleteAchievement = async (id) => {
    try {
      await axios.delete(`/api/admin/achievements/${id}`, getAuthHeader());
      await refreshData();
      showNotification('Achievement deleted!');
    } catch (err) {
      alert('Failed to delete achievement.');
    }
  };


  // --- Messages Handlers ---
  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`/api/admin/messages/${id}`, getAuthHeader());
      fetchMessages();
      showNotification('Message deleted!');
    } catch (err) {
      alert('Failed to delete message.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 2500,
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* CMS Header Bar */}
      <div style={{
        padding: '16px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-hairline)',
        background: 'var(--bg-surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <ArrowLeft size={16} />
            <span>Return to Portfolio</span>
          </button>
          <div style={{ height: '16px', width: '1px', background: 'var(--border-hairline)' }} />
          <h2 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
            <ShieldCheck size={18} style={{ color: '#166534' }} />
            <span>Admin CMS Panel</span>
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {saveStatus && (
            <div style={{
              padding: '4px 12px',
              borderRadius: 'var(--radius-sm)',
              background: '#f0fdf4',
              color: '#166534',
              fontSize: '0.8rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid #bbf7d0'
            }}>
              <Check size={14} />
              <span>{saveStatus}</span>
            </div>
          )}

          <button
            onClick={() => { logout(); onClose(); }}
            className="btn-outline"
            style={{
              padding: '6px 14px',
              fontSize: '0.8rem',
              color: '#991b1b'
            }}
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main CMS Workspace */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar Nav */}
        <div style={{
          width: '220px',
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-hairline)',
          padding: '20px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          {[
            { id: 'profile', label: 'Personal Details', icon: User },
            { id: 'projects', label: 'Projects Manager', icon: FolderPlus },
            { id: 'blogs', label: 'Blogs & Writing', icon: BookOpen },
            { id: 'skills', label: 'Skills & Stack', icon: Code2 },
            { id: 'dsa', label: 'DSA Profiles', icon: Trophy },
            { id: 'education', label: 'Education & Awards', icon: GraduationCap },
            { id: 'messages', label: 'Messages', icon: MessageSquare }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'var(--primary-ink)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: isActive ? '600' : '400',
                  fontSize: '0.875rem',
                  textAlign: 'left',
                  transition: 'var(--transition-fast)'
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* CMS Tab Body */}
        <div style={{ flex: 1, padding: '36px', overflowY: 'auto', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'profile' && (
                <div style={{ maxWidth: '800px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Edit Personal Details</h3>
              <form onSubmit={handleSaveProfile} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Professional Title</label>
                  <input
                    type="text"
                    value={profileForm.title || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Short Intro (Hero Section)</label>
                  <input
                    type="text"
                    value={profileForm.shortIntro || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, shortIntro: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Full Biography (About Section)</label>
                  <textarea
                    rows="5"
                    value={profileForm.bio || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Avatar Image (URL or Choose PNG/JPG)</label>
                  <input
                    type="text"
                    value={profileForm.avatarUrl || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                    placeholder="https://... or select local file"
                    style={{ ...inputStyle, marginBottom: '6px' }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0], (url) => setProfileForm({ ...profileForm, avatarUrl: url }))}
                    style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Cover Image (URL or Choose PNG/JPG)</label>
                  <input
                    type="text"
                    value={profileForm.coverImageUrl || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, coverImageUrl: e.target.value })}
                    placeholder="https://... or select local file"
                    style={{ ...inputStyle, marginBottom: '6px' }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0], (url) => setProfileForm({ ...profileForm, coverImageUrl: url }))}
                    style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}
                  />
                </div>


                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Resume Download Link / URL</label>
                  <input
                    type="text"
                    value={profileForm.resumeUrl || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Contact Email</label>
                  <input
                    type="email"
                    value={profileForm.email || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Contact Phone</label>
                  <input
                    type="text"
                    value={profileForm.phone || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Location</label>
                  <input
                    type="text"
                    value={profileForm.location || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    placeholder="San Francisco, CA"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>GitHub Profile Link</label>
                  <input
                    type="text"
                    value={profileForm.githubUrl || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>LinkedIn Profile Link</label>
                  <input
                    type="text"
                    value={profileForm.linkedinUrl || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Twitter / X Profile Link</label>
                  <input
                    type="text"
                    value={profileForm.twitterUrl || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, twitterUrl: e.target.value })}
                    style={inputStyle}
                  />
                </div>


                <div style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                  <button type="submit" className="btn-primary">
                    <Save size={16} />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGER */}
          {activeTab === 'projects' && (
            <div style={{ maxWidth: '900px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.5rem' }}>Manage Projects</h3>
                {editingProject && (
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setProjectForm({ title: '', subtitle: '', description: '', fullDescription: '', imageUrl: '', category: 'Full Stack', techStack: '', githubUrl: '', liveDemoUrl: '', featured: false });
                    }}
                    className="btn-secondary"
                  >
                    <Plus size={16} />
                    <span>Create New Project Instead</span>
                  </button>
                )}
              </div>

              {/* Project Input Form */}
              <div className="glass-panel" style={{ padding: '24px', marginBottom: '36px' }}>
                <h4 style={{ marginBottom: '16px', color: 'var(--accent-indigo)' }}>
                  {editingProject ? `Editing: ${editingProject.title}` : 'Add New Portfolio Project'}
                </h4>
                <form onSubmit={handleSaveProject} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Title *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Subtitle</label>
                    <input
                      type="text"
                      value={projectForm.subtitle}
                      onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Image (URL or Choose PNG/JPG) *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.imageUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                      placeholder="https://... or select local file"
                      style={{ ...inputStyle, marginBottom: '6px' }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0], (url) => setProjectForm({ ...projectForm, imageUrl: url }))}
                      style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}
                    />
                  </div>


                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Category</label>
                    <input
                      type="text"
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      placeholder="e.g. Full Stack, AI, Systems"
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Tech Stack (Comma Separated)</label>
                    <input
                      type="text"
                      value={projectForm.techStack}
                      onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                      placeholder="React, Node.js, Express, MongoDB"
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Short Description *</label>
                    <textarea
                      rows="3"
                      required
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>GitHub URL</label>
                    <input
                      type="text"
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Live Demo URL</label>
                    <input
                      type="text"
                      value={projectForm.liveDemoUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, liveDemoUrl: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      id="featured"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    />
                    <label htmlFor="featured" style={{ fontSize: '0.85rem' }}>Feature on Top</label>
                  </div>

                  <div style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                    <button type="submit" className="btn-primary">
                      <Save size={16} />
                      <span>{editingProject ? 'Update Project' : 'Add Project to Portfolio'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Projects List Table */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {projectsList.map((proj) => (
                  <div key={proj._id} className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <img src={proj.imageUrl} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div>
                        <h4 style={{ fontSize: '1.05rem' }}>{proj.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{proj.category}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => startEditProject(proj)} className="btn-secondary" style={{ padding: '8px' }}>
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDeleteProject(proj._id)} style={{ padding: '8px', color: '#f87171' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: BLOGS MANAGER */}
          {activeTab === 'blogs' && (
            <div style={{ maxWidth: '900px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.5rem' }}>Manage Blog Articles</h3>
                {editingBlog && (
                  <button
                    onClick={() => {
                      setEditingBlog(null);
                      setBlogForm({ title: '', subtitle: '', category: 'Engineering', readTime: '5 min read', coverImageUrl: '', tags: '', content: '', featured: false });
                    }}
                    className="btn-outline"
                    style={{ fontSize: '0.8rem', padding: '4px 10px' }}
                  >
                    + Write New Article
                  </button>
                )}
              </div>

              {/* Form to Create/Edit Blog */}
              <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>
                  {editingBlog ? `Edit Article: "${editingBlog.title}"` : 'Create & Publish New Blog Article'}
                </h4>
                <form onSubmit={handleSaveBlog} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Article Title</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. Scaling Systems to 100k QPS"
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Subtitle / Excerpt</label>
                    <input
                      type="text"
                      required
                      value={blogForm.subtitle}
                      onChange={(e) => setBlogForm({ ...blogForm, subtitle: e.target.value })}
                      style={inputStyle}
                      placeholder="Brief summary of the article..."
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Category</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      style={inputStyle}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Database">Database</option>
                      <option value="Tutorial">Tutorial</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Read Time</label>
                    <input
                      type="text"
                      value={blogForm.readTime}
                      onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. 5 min read"
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Cover Image URL / Local Image</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="text"
                        value={blogForm.coverImageUrl}
                        onChange={(e) => setBlogForm({ ...blogForm, coverImageUrl: e.target.value })}
                        style={{ ...inputStyle, flex: 1 }}
                        placeholder="https://images.unsplash.com/..."
                      />
                      <label className="btn-outline" style={{ cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}>
                        Browse File
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageUpload(e.target.files[0], (url) => setBlogForm({ ...blogForm, coverImageUrl: url }))}
                        />
                      </label>
                    </div>
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                      style={inputStyle}
                      placeholder="Node.js, MongoDB, Performance"
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Article Content (Markdown supported)</label>
                    <textarea
                      required
                      rows={8}
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      style={{ ...inputStyle, fontFamily: 'monospace' }}
                      placeholder="Write your article content here..."
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      id="featuredBlog"
                      checked={blogForm.featured}
                      onChange={(e) => setBlogForm({ ...blogForm, featured: e.target.checked })}
                    />
                    <label htmlFor="featuredBlog" style={{ fontSize: '0.85rem' }}>Feature on Blogs Page Top</label>
                  </div>

                  <div style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                    <button type="submit" className="btn-primary">
                      <Save size={16} />
                      <span>{editingBlog ? 'Update Article' : 'Publish Article'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Blogs List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {blogsList.map((b) => (
                  <div key={b._id} className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <img src={b.coverImageUrl} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div>
                        <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{b.title}</h4>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '2px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.category}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>• {b.readTime}</span>
                          {b.featured && <span className="kicker-tag" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>FEATURED</span>}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => startEditBlog(b)} className="btn-secondary" style={{ padding: '8px' }}>
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDeleteBlog(b._id)} style={{ padding: '8px', color: '#f87171' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS CMS */}
          {activeTab === 'skills' && (
            <div style={{ maxWidth: '800px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Skills & Technologies</h3>

              <form onSubmit={handleAddSkill} className="glass-panel" style={{ padding: '24px', marginBottom: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Skill Name</label>
                  <input
                    type="text"
                    required
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    placeholder="e.g. React"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Category</label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="DevOps & Cloud">DevOps & Cloud</option>
                    <option value="Languages & CS">Languages & CS</option>
                    <option value="Tools & Others">Tools & Others</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Proficiency ({skillForm.proficiency}%)</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={skillForm.proficiency}
                    onChange={(e) => setSkillForm({ ...skillForm, proficiency: Number(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <button type="submit" className="btn-primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
                    <Plus size={16} />
                    <span>Add Skill</span>
                  </button>
                </div>
              </form>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                {skillsList.map((skill) => (
                  <div key={skill._id} className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '0.95rem' }}>{skill.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{skill.category} ({skill.proficiency}%)</span>
                    </div>
                    <button onClick={() => handleDeleteSkill(skill._id)} style={{ color: '#f87171' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DSA PROFILES CMS */}
          {activeTab === 'dsa' && (
            <div style={{ maxWidth: '800px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Manage DSA & Platform Profiles</h3>

              <form onSubmit={handleAddDsa} className="glass-panel" style={{ padding: '24px', marginBottom: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Platform Name</label>
                  <input
                    type="text"
                    required
                    value={dsaForm.platform}
                    onChange={(e) => setDsaForm({ ...dsaForm, platform: e.target.value })}
                    placeholder="Codeforces, LeetCode..."
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Profile Handle</label>
                  <input
                    type="text"
                    required
                    value={dsaForm.handle}
                    onChange={(e) => setDsaForm({ ...dsaForm, handle: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Profile URL *</label>
                  <input
                    type="text"
                    required
                    value={dsaForm.profileUrl}
                    onChange={(e) => setDsaForm({ ...dsaForm, profileUrl: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Rating / Rank</label>
                  <input
                    type="text"
                    value={dsaForm.rating}
                    onChange={(e) => setDsaForm({ ...dsaForm, rating: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Solved Count / Badge</label>
                  <input
                    type="text"
                    value={dsaForm.solvedCount}
                    onChange={(e) => setDsaForm({ ...dsaForm, solvedCount: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <Plus size={16} />
                    <span>Add DSA Profile</span>
                  </button>
                </div>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {dsaList.map((item) => (
                  <div key={item._id} className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem' }}>{item.platform} (@{item.handle})</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.profileUrl}</span>
                    </div>
                    <button onClick={() => handleDeleteDsa(item._id)} style={{ color: '#f87171' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EDUCATION & ACHIEVEMENTS CMS */}
          {activeTab === 'education' && (
            <div style={{ maxWidth: '900px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Manage Education & Achievements</h3>

              {/* Add Education Form */}
              <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }}>
                <h4 style={{ marginBottom: '16px', color: 'var(--accent-indigo)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GraduationCap size={20} />
                  <span>Add Education Entry</span>
                </h4>
                <form onSubmit={handleAddEducation} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Institution / University *</label>
                    <input
                      type="text"
                      required
                      value={eduForm.institution}
                      onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                      placeholder="e.g. Stanford University"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Degree / Specialization *</label>
                    <input
                      type="text"
                      required
                      value={eduForm.degree}
                      onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                      placeholder="e.g. B.S. in Computer Science"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Duration *</label>
                    <input
                      type="text"
                      required
                      value={eduForm.duration}
                      onChange={(e) => setEduForm({ ...eduForm, duration: e.target.value })}
                      placeholder="e.g. 2020 - 2024"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Grade / GPA</label>
                    <input
                      type="text"
                      value={eduForm.grade}
                      onChange={(e) => setEduForm({ ...eduForm, grade: e.target.value })}
                      placeholder="e.g. 3.9 GPA"
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Description</label>
                    <input
                      type="text"
                      value={eduForm.description}
                      onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                      placeholder="Specialized in software systems, algorithms..."
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <button type="submit" className="btn-primary">
                      <Plus size={16} />
                      <span>Add Education Record</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Education List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                <h5 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Education List</h5>
                {educationList.map((edu) => (
                  <div key={edu._id} className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem' }}>{edu.institution}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--accent-indigo)' }}>{edu.degree} ({edu.duration})</p>
                      {edu.description && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{edu.description}</p>}
                    </div>
                    <button onClick={() => handleDeleteEducation(edu._id)} style={{ color: '#f87171' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Achievement Form */}
              <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }}>
                <h4 style={{ marginBottom: '16px', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={20} />
                  <span>Add Achievement / Award</span>
                </h4>
                <form onSubmit={handleAddAchievement} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Title *</label>
                    <input
                      type="text"
                      required
                      value={achForm.title}
                      onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                      placeholder="e.g. 1st Place Hackathon Winner"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Organization / Issuer</label>
                    <input
                      type="text"
                      value={achForm.organization}
                      onChange={(e) => setAchForm({ ...achForm, organization: e.target.value })}
                      placeholder="e.g. Meta AI / Codeforces"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Year</label>
                    <input
                      type="text"
                      value={achForm.year}
                      onChange={(e) => setAchForm({ ...achForm, year: e.target.value })}
                      placeholder="e.g. 2024"
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Description</label>
                    <input
                      type="text"
                      value={achForm.description}
                      onChange={(e) => setAchForm({ ...achForm, description: e.target.value })}
                      placeholder="Built a real-time document engine..."
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <button type="submit" className="btn-primary">
                      <Plus size={16} />
                      <span>Add Achievement Record</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Achievement List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h5 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Achievements List</h5>
                {achievementsList.map((ach) => (
                  <div key={ach._id} className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem' }}>{ach.title} ({ach.year})</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--accent-pink)' }}>{ach.organization}</p>
                      {ach.description && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ach.description}</p>}
                    </div>
                    <button onClick={() => handleDeleteAchievement(ach._id)} style={{ color: '#f87171' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CONTACT MESSAGES */}
          {activeTab === 'messages' && (

            <div style={{ maxWidth: '850px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Incoming Messages ({messages.length})</h3>

              {messages.length === 0 ? (
                <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No incoming contact messages yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {messages.map((msg) => (
                    <div key={msg._id} className="glass-panel" style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <h4 style={{ fontSize: '1.1rem' }}>{msg.senderName}</h4>
                          <span style={{ fontSize: '0.85rem', color: 'var(--accent-indigo)' }}>{msg.senderEmail}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                          <button onClick={() => handleDeleteMessage(msg._id)} style={{ color: '#f87171' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p style={{ fontWeight: '600', marginBottom: '8px', fontSize: '0.95rem' }}>Subject: {msg.subject}</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--bg-surface)',
  border: '1px solid var(--border-hairline)',
  color: 'var(--text-primary)',
  outline: 'none',
  fontSize: '0.9rem'
};
