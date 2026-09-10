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
      setStatus({ loading: false, success: 'Thank you! Your message has been sent.', error: null });
      setFormData({ senderName: '', senderEmail: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.response?.data?.message || 'Failed to send message.' });
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div className="section-header">
          <span className="kicker-tag">COMMUNICATION</span>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Initiate conversations for technical projects, advisory, or engineering roles.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {/* Details Card */}
          <div className="editorial-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>Direct Coordinates</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {profile.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Mail size={16} />
                    <span>{profile.email}</span>
                  </div>
                )}
                {profile.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Phone size={16} />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <MapPin size={16} />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-hairline)' }}>
              <span className="kicker-tag" style={{ marginBottom: '8px', display: 'block' }}>Social Links</span>
              <div style={{ display: 'flex', gap: '12px' }}>
                {profile.githubUrl && (
                  <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '8px' }}>
                    <Github size={16} />
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '8px' }}>
                    <Linkedin size={16} />
                  </a>
                )}
                {profile.twitterUrl && (
                  <a href={profile.twitterUrl} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '8px' }}>
                    <Twitter size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="editorial-card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>Send Message</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', marginBottom: '4px' }}>Name</label>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-hairline)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', marginBottom: '4px' }}>Email</label>
                <input
                  type="email"
                  name="senderEmail"
                  value={formData.senderEmail}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-hairline)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', marginBottom: '4px' }}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry topic"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-hairline)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', marginBottom: '4px' }}>Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Briefly describe your inquiry..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-hairline)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.9rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              {status.success && (
                <div style={{ color: '#166534', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} />
                  <span>{status.success}</span>
                </div>
              )}

              {status.error && (
                <div style={{ color: '#991b1b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertCircle size={16} />
                  <span>{status.error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className="btn-primary"
                style={{ justifyContent: 'center', width: '100%', marginTop: '8px' }}
              >
                <Send size={14} />
                <span>{status.loading ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

