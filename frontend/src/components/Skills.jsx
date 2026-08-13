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
    <section id="skills" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="tech-tag" style={{ color: 'var(--accent-cyan)' }}>Technical Competency</span>
          <h2 className="section-title">Skills & Capabilities</h2>
          <p className="section-subtitle">
            Technologies, frameworks, and programming paradigms I utilize to craft modern software.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '40px'
        }}>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                background: selectedCategory === cat ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === cat ? '#000000' : 'var(--text-secondary)',
                fontWeight: '700',
                fontSize: '0.875rem',
                border: selectedCategory === cat ? '1px solid #fff' : '1px solid var(--border-subtle)',
                boxShadow: selectedCategory === cat ? 'var(--shadow-glow-cyan)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const IconComponent = iconMap[skill.icon] || Code;
              return (
                <motion.div 
                  layout
                  key={skill._id || index}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  whileHover={{ y: -6, boxShadow: '0 15px 30px rgba(0, 245, 212, 0.18)' }}
                  className="glass-panel" 
                  style={{
                    padding: '24px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'rgba(0, 245, 212, 0.12)',
                      color: 'var(--accent-cyan)',
                      border: '1px solid rgba(0, 245, 212, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComponent size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', color: '#ffffff' }}>{skill.name}</h4>
                      <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{skill.category}</span>
                    </div>
                  </div>

                  {/* Animated Proficiency Bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      <span>Proficiency</span>
                      <span style={{ fontWeight: '600', color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>{skill.proficiency}%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      borderRadius: '3px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      overflow: 'hidden'
                    }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                        style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)',
                          borderRadius: '3px',
                          boxShadow: '0 0 10px rgba(0, 245, 212, 0.5)'
                        }} 
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
