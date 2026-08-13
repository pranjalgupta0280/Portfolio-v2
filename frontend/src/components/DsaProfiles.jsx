import React from 'react';
import { ExternalLink, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const platformColors = {
  Codeforces: { bg: 'rgba(168, 85, 247, 0.15)', text: '#c084fc', border: 'rgba(168, 85, 247, 0.3)' },
  LeetCode: { bg: 'rgba(0, 245, 212, 0.15)', text: '#00f5d4', border: 'rgba(0, 245, 212, 0.3)' },
  CodeChef: { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171', border: 'rgba(239, 68, 68, 0.3)' },
  GitHub: { bg: 'rgba(255, 255, 255, 0.12)', text: '#f3f4f6', border: 'rgba(255, 255, 255, 0.2)' },
  GeeksforGeeks: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)' }
};

export default function DsaProfiles() {
  const { data } = usePortfolio();
  const dsaProfiles = data.dsaProfiles || [];

  return (
    <section id="dsa" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="tech-tag" style={{ color: 'var(--accent-cyan)' }}>Competitive Coding</span>
          <h2 className="section-title">DSA & Coding Profiles</h2>
          <p className="section-subtitle">
            Problem-solving track record across major algorithmic & code hosting platforms.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '24px'
        }}>
          {dsaProfiles.map((item, idx) => {
            const style = platformColors[item.platform] || { bg: 'rgba(0, 245, 212, 0.15)', text: '#00f5d4', border: 'rgba(0, 245, 212, 0.3)' };

            return (
              <motion.div 
                key={item._id || idx}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 245, 212, 0.2)' }}
                className="glass-panel" 
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '24px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      background: style.bg,
                      color: style.text,
                      border: `1px solid ${style.border}`,
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'var(--font-code)'
                    }}>
                      <Code2 size={16} />
                      <span>{item.platform}</span>
                    </div>

                    <motion.a
                      whileHover={{ scale: 1.25, rotate: 15, color: 'var(--accent-cyan)' }}
                      href={item.profileUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: 'var(--text-secondary)',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      <ExternalLink size={18} />
                    </motion.a>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', marginBottom: '12px', color: '#ffffff', fontFamily: 'var(--font-code)' }}>@{item.handle}</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {item.rating && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Current Rating:</span>
                        <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-code)' }}>{item.rating}</strong>
                      </div>
                    )}
                    {item.maxRating && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Max Rating:</span>
                        <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>{item.maxRating}</strong>
                      </div>
                    )}
                    {item.rank && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Rank:</span>
                        <strong style={{ color: 'var(--accent-purple)', fontFamily: 'var(--font-code)' }}>{item.rank}</strong>
                      </div>
                    )}
                    {item.solvedCount && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Problems Solved:</span>
                        <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>{item.solvedCount}+</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={item.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-dark-pill"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '10px',
                      fontSize: '0.85rem'
                    }}
                  >
                    <span>Inspect Platform Profile</span>
                    <ExternalLink size={14} />
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
