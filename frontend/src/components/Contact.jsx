import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export default function Contact() {
  const { data, sendContactMessage } = usePortfolio();
  const profile = data.profile || {};

  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });
    try {
      await sendContactMessage(formData);
      setStatus({ loading: false, success: 'Thank you! Your message has been sent successfully.', error: null });
      setFormData({ senderName: '', senderEmail: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.response?.data?.message || 'Failed to send message.' });
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="tech-tag" style={{ color: 'var(--accent-cyan)' }}>Get in Touch</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind, a job opportunity, or just want to connect? Send a message below.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px'
        }}>
          {/* Contact Details Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="glass-panel" 
            style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '24px' }}
          >
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: '#ffffff' }}>Contact Information</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6' }}>
                Feel free to reach out via the contact form or directly through email and social platforms.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {profile.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(0, 245, 212, 0.12)',
                      color: 'var(--accent-cyan)',
                      border: '1px solid rgba(0, 245, 212, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>EMAIL</span>
                      <p style={{ fontWeight: '600', color: '#ffffff' }}>{profile.email}</p>
                    </div>
                  </div>
                )}

                {profile.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(168, 85, 247, 0.12)',
                      color: 'var(--accent-purple)',
                      border: '1px solid rgba(168, 85, 247, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>PHONE</span>
                      <p style={{ fontWeight: '600', color: '#ffffff' }}>{profile.phone}</p>
                    </div>
                  </div>
                )}

                {profile.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(0, 245, 212, 0.12)',
                      color: 'var(--accent-cyan)',
                      border: '1px solid rgba(0, 245, 212, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>LOCATION</span>
                      <p style={{ fontWeight: '600', color: '#ffffff' }}>{profile.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-code)', color: 'var(--text-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>
                SOCIAL NETWORKS
              </span>
              <div style={{ display: 'flex', gap: '12px' }}>
                {profile.githubUrl && (
                  <motion.a whileHover={{ scale: 1.15, color: 'var(--accent-cyan)' }} href={profile.githubUrl} target="_blank" rel="noreferrer" className="btn-dark-pill" style={{ padding: '10px 14px' }}>
                    <Github size={18} />
                  </motion.a>
                )}
                {profile.linkedinUrl && (
                  <motion.a whileHover={{ scale: 1.15, color: 'var(--accent-cyan)' }} href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="btn-dark-pill" style={{ padding: '10px 14px' }}>
                    <Linkedin size={18} />
                  </motion.a>
                )}
                {profile.twitterUrl && (
                  <motion.a whileHover={{ scale: 1.15, color: 'var(--accent-cyan)' }} href={profile.twitterUrl} target="_blank" rel="noreferrer" className="btn-dark-pill" style={{ padding: '10px 14px' }}>
                    <Twitter size={18} />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Interactive Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel" 
            style={{ padding: '36px', borderRadius: '24px' }}
          >
            <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#ffffff' }}>Send a Message</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '6px' }}>Your Name *</label>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  required
                  placeholder="Sarah Jenkins"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    outline: 'none',
                    transition: 'border 0.3s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '6px' }}>Email Address *</label>
                <input
                  type="email"
                  name="senderEmail"
                  value={formData.senderEmail}
                  onChange={handleChange}
                  required
                  placeholder="sarah@example.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    outline: 'none',
                    transition: 'border 0.3s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '6px' }}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry / Job Opportunity"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    outline: 'none',
                    transition: 'border 0.3s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '6px' }}>Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Describe your project, timeline, or inquiry..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border 0.3s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
                />
              </div>

              {status.success && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#34d399',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.9rem'
                  }}
                >
                  <CheckCircle2 size={18} />
                  <span>{status.success}</span>
                </motion.div>
              )}

              {status.error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#f87171',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.9rem'
                  }}
                >
                  <AlertCircle size={18} />
                  <span>{status.error}</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status.loading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-cyan"
                style={{ justifyContent: 'center', marginTop: '10px', color: '#000000' }}
              >
                <Send size={16} style={{ color: '#000000' }} />
                <span style={{ color: '#000000', fontWeight: '700' }}>{status.loading ? 'Sending Message...' : 'Send Message'}</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
