import React, { useState } from 'react';
import { Code, Layout, Server, Database, Cloud, Cpu, GitBranch, Palette, Terminal, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <section id="skills" className="section-padding">
      <div className="container">
        <div className="section-header">
          <span className="kicker-tag">CAPABILITIES</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Core toolsets, technical stack, and software methodologies.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '32px'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                background: selectedCategory === cat ? 'var(--primary-ink)' : 'transparent',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: '500',
                fontSize: '0.8rem',
                border: '1px solid var(--border-hairline)',
                transition: 'var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Stack */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const IconComponent = iconMap[skill.icon] || Code;
              return (
                <motion.div 
                  key={skill._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="editorial-card" 
                  style={{ padding: '20px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-muted)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{skill.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{skill.category}</span>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      <span>Proficiency</span>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{skill.proficiency}%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '4px',
                      borderRadius: '2px',
                      background: 'var(--bg-muted)',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${skill.proficiency}%`,
                        height: '100%',
                        background: 'var(--primary-ink)',
                        borderRadius: '2px'
                      }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

