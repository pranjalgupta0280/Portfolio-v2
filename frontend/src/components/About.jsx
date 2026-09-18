import React, { useState } from 'react';
import { User, GraduationCap, Trophy, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export default function About() {
  const { data } = usePortfolio();
  const profile = data.profile || {};
  const education = data.education || [];
  const achievements = data.achievements || [];

  const [activeTab, setActiveTab] = useState('bio');

  return (
    <section id="about" className="section-padding">
      <div className="container">
        <div className="section-header">
          <span className="kicker-tag">BACKGROUND & MEMOIRS</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Overview of engineering experience, education, and milestones.
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-hairline)',
          paddingBottom: '12px'
        }}>
          <button
            onClick={() => setActiveTab('bio')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'bio' ? 'var(--primary-ink)' : 'transparent',
              color: activeTab === 'bio' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: '500',
              fontSize: '0.85rem',
              transition: 'var(--transition-fast)'
            }}
          >
            <User size={14} />
            <span>Biography</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'education' ? 'var(--primary-ink)' : 'transparent',
              color: activeTab === 'education' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: '500',
              fontSize: '0.85rem',
              transition: 'var(--transition-fast)'
            }}
          >
            <GraduationCap size={14} />
            <span>Education</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'achievements' ? 'var(--primary-ink)' : 'transparent',
              color: activeTab === 'achievements' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: '500',
              fontSize: '0.85rem',
              transition: 'var(--transition-fast)'
            }}
          >
            <Trophy size={14} />
            <span>Achievements</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'bio' && (
            <motion.div 
              key="bio"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="editorial-card" 
              style={{ padding: '28px' }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px' }}>
                Engineering Overview
              </h3>
              <p style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.75',
                whiteSpace: 'pre-line'
              }}>
                {profile.bio || 'Detailed biography will appear here once updated in the Admin panel.'}
              </p>
            </motion.div>
          )}

          {activeTab === 'education' && (
            <motion.div 
              key="education"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {education.map((edu, idx) => (
                <div 
                  key={edu._id || idx}
                  className="editorial-card" 
                  style={{ padding: '24px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{edu.institution}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} />
                      {edu.duration}
                    </span>
                  </div>
                  <p style={{ fontWeight: '500', color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '6px' }}>{edu.degree}</p>
                  {edu.grade && <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Grade: {edu.grade}</p>}
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{edu.description}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div 
              key="achievements"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {achievements.map((ach, idx) => (
                <div 
                  key={ach._id || idx}
                  className="editorial-card" 
                  style={{ padding: '24px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{ach.title}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{ach.year}</span>
                  </div>
                  <p style={{ fontWeight: '500', color: 'var(--text-primary)', fontSize: '0.875rem', marginBottom: '6px' }}>{ach.organization}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{ach.description}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

