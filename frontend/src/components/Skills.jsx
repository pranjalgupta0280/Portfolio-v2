import React, { useState } from 'react';
import { Code, Layout, Server, Database, Cloud, Cpu, GitBranch, Palette, Terminal, Wrench } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = {
  Code: Code,
  Layout: Layout,
  Server: Server,
  Database: Database,
  Cloud: Cloud,
  Cpu: Cpu,
  GitBranch: GitBranch,
  Palette: Palette,
  Terminal: Terminal,
  Wrench: Wrench
};

export default function Skills() {
  const { data } = usePortfolio();
  const skills = data.skills || [];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(skills.map(s => s.category))];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="section-padding" style={{ position: 'relative', background: 'rgba(15, 23, 42, 0.3)' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge">Technical Competency</span>
          <h2 className="section-title">Skills & Capabilities</h2>
          <p className="section-subtitle">
            Technologies, frameworks, and programming paradigms I utilize to craft modern software.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '40px'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                background: selectedCategory === cat ? 'var(--gradient-brand)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: '600',
                fontSize: '0.875rem',
                border: '1px solid var(--border-subtle)',
                transition: 'var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {filteredSkills.map((skill) => {
            const IconComponent = iconMap[skill.icon] || Code;
            return (
              <div key={skill._id} className="glass-panel" style={{
                padding: '24px',
                transition: 'var(--transition-smooth)',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    color: '#818cf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem' }}>{skill.name}</h4>
                    <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{skill.category}</span>
                  </div>
                </div>

                {/* Proficiency Bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    <span>Proficiency</span>
                    <span style={{ fontWeight: '600', color: 'var(--accent-indigo)' }}>{skill.proficiency}%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${skill.proficiency}%`,
                      height: '100%',
                      background: 'var(--gradient-brand)',
                      borderRadius: '3px',
                      transition: 'width 1s ease-in-out'
                    }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
