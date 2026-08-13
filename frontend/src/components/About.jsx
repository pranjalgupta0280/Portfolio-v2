import React, { useState } from 'react';
import { User, GraduationCap, Trophy, Award, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export default function About() {
  const { data } = usePortfolio();
  const profile = data.profile || {};
  const education = data.education || [];
  const achievements = data.achievements || [];

  const [activeTab, setActiveTab] = useState('bio');

  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="tech-tag" style={{ color: 'var(--accent-cyan)' }}>Background & Experience</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A glance into my technical journey, academic foundation, and milestones.
          </p>
        </motion.div>

        {/* Tab Selection */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('bio')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'bio' ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
              color: activeTab === 'bio' ? '#000000' : 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '0.9rem',
              border: activeTab === 'bio' ? '1px solid #fff' : '1px solid var(--border-subtle)',
              boxShadow: activeTab === 'bio' ? 'var(--shadow-glow-cyan)' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <User size={16} />
            <span>Biography</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('education')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'education' ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
              color: activeTab === 'education' ? '#000000' : 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '0.9rem',
              border: activeTab === 'education' ? '1px solid #fff' : '1px solid var(--border-subtle)',
              boxShadow: activeTab === 'education' ? 'var(--shadow-glow-cyan)' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <GraduationCap size={16} />
            <span>Education ({education.length})</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('achievements')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'achievements' ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
              color: activeTab === 'achievements' ? '#000000' : 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '0.9rem',
              border: activeTab === 'achievements' ? '1px solid #fff' : '1px solid var(--border-subtle)',
              boxShadow: activeTab === 'achievements' ? 'var(--shadow-glow-cyan)' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <Trophy size={16} />
            <span>Achievements ({achievements.length})</span>
          </motion.button>
        </div>

        {/* Tab Content Display */}
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'bio' && (
              <motion.div 
                key="bio"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="glass-panel" 
                style={{ padding: '36px', borderRadius: '24px' }}
              >
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: 'var(--accent-cyan)' }}>
                  Professional Overview
                </h3>
                <p style={{
                  fontSize: '1.05rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  whiteSpace: 'pre-line'
                }}>
                  {profile.bio || 'Detailed bio will appear here once updated in the Admin panel.'}
                </p>
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div 
                key="education"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                {education.map((edu, idx) => (
                  <motion.div 
                    key={edu._id || idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 245, 212, 0.15)' }}
                    className="glass-panel" 
                    style={{ padding: '28px', display: 'flex', gap: '20px', borderRadius: '24px' }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'rgba(0, 245, 212, 0.12)',
                      color: 'var(--accent-cyan)',
                      border: '1px solid rgba(0, 245, 212, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <GraduationCap size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                        <h4 style={{ fontSize: '1.2rem', color: '#ffffff' }}>{edu.institution}</h4>
                        <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-code)' }}>
                          <Calendar size={14} />
                          {edu.duration}
                        </span>
                      </div>
                      <p style={{ fontWeight: '600', color: 'var(--accent-purple)', marginBottom: '4px' }}>{edu.degree}</p>
                      {edu.grade && <p style={{ fontSize: '0.875rem', color: 'var(--accent-cyan)', fontWeight: '600', marginBottom: '8px', fontFamily: 'var(--font-code)' }}>{edu.grade}</p>}
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{edu.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <motion.div 
                key="achievements"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                {achievements.map((ach, idx) => (
                  <motion.div 
                    key={ach._id || idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(168, 85, 247, 0.2)' }}
                    className="glass-panel" 
                    style={{ padding: '28px', display: 'flex', gap: '20px', borderRadius: '24px' }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'rgba(168, 85, 247, 0.12)',
                      color: 'var(--accent-purple)',
                      border: '1px solid rgba(168, 85, 247, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Award size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                        <h4 style={{ fontSize: '1.2rem', color: '#ffffff' }}>{ach.title}</h4>
                        <span style={{ fontSize: '0.85rem', color: 'var(--accent-purple)', fontFamily: 'var(--font-code)' }}>{ach.year}</span>
                      </div>
                      <p style={{ fontWeight: '600', color: 'var(--accent-cyan)', fontSize: '0.9rem', marginBottom: '8px' }}>{ach.organization}</p>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{ach.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
