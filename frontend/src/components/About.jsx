import React, { useState } from 'react';
import { User, GraduationCap, Trophy, Award, Calendar } from 'lucide-react';
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
        <div className="section-header">
          <span className="badge">Background & Experience</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A glance into my technical journey, academic foundation, and milestones.
          </p>
        </div>

        {/* Tab Selection */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '40px'
        }}>
          <button
            onClick={() => setActiveTab('bio')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'bio' ? 'var(--gradient-brand)' : 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'var(--transition-fast)'
            }}
          >
            <User size={16} />
            <span>Biography</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'education' ? 'var(--gradient-brand)' : 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'var(--transition-fast)'
            }}
          >
            <GraduationCap size={16} />
            <span>Education ({education.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'achievements' ? 'var(--gradient-brand)' : 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'var(--transition-fast)'
            }}
          >
            <Trophy size={16} />
            <span>Achievements ({achievements.length})</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          {activeTab === 'bio' && (
            <div className="glass-panel" style={{ padding: '36px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: 'var(--accent-indigo)' }}>
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
            </div>
          )}

          {activeTab === 'education' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {education.map((edu) => (
                <div key={edu._id} className="glass-panel" style={{ padding: '28px', display: 'flex', gap: '20px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    color: '#818cf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <GraduationCap size={24} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                      <h4 style={{ fontSize: '1.2rem' }}>{edu.institution}</h4>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-indigo)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} />
                        {edu.duration}
                      </span>
                    </div>
                    <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>{edu.degree}</p>
                    {edu.grade && <p style={{ fontSize: '0.875rem', color: 'var(--accent-emerald)', fontWeight: '600', marginBottom: '8px' }}>{edu.grade}</p>}
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {achievements.map((ach) => (
                <div key={ach._id} className="glass-panel" style={{ padding: '28px', display: 'flex', gap: '20px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(236, 72, 153, 0.15)',
                    color: '#f472b6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Award size={24} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                      <h4 style={{ fontSize: '1.2rem' }}>{ach.title}</h4>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-pink)' }}>{ach.year}</span>
                    </div>
                    <p style={{ fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>{ach.organization}</p>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
