import React from 'react';
import { ExternalLink, Flame, Trophy, Award, CheckCircle2, Star, Code2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const platformColors = {
  Codeforces: { bg: 'rgba(168, 85, 247, 0.15)', text: '#c084fc', border: 'rgba(168, 85, 247, 0.3)' },
  LeetCode: { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' },
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
        <div className="section-header">
          <span className="badge">Competitive Coding</span>
          <h2 className="section-title">DSA & Coding Profiles</h2>
          <p className="section-subtitle">
            Problem-solving track record across major algorithmic & code hosting platforms.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '24px'
        }}>
          {dsaProfiles.map((item) => {
            const style = platformColors[item.platform] || { bg: 'rgba(99, 102, 241, 0.15)', text: '#818cf8', border: 'rgba(99, 102, 241, 0.3)' };

            return (
              <div key={item._id} className="glass-panel" style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'var(--transition-smooth)'
              }}>
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
                      gap: '6px'
                    }}>
                      <Code2 size={16} />
                      <span>{item.platform}</span>
                    </div>

                    <a
                      href={item.profileUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: 'var(--text-secondary)',
                        transition: 'var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => (e.target.style.color = '#fff')}
                      onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>@{item.handle}</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {item.rating && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Current Rating:</span>
                        <strong style={{ color: 'var(--text-primary)' }}>{item.rating}</strong>
                      </div>
                    )}
                    {item.maxRating && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Max Rating:</span>
                        <strong style={{ color: 'var(--accent-indigo)' }}>{item.maxRating}</strong>
                      </div>
                    )}
                    {item.rank && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Rank:</span>
                        <strong style={{ color: 'var(--accent-purple)' }}>{item.rank}</strong>
                      </div>
                    )}
                    {item.solvedCount && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Problems Solved:</span>
                        <strong style={{ color: 'var(--accent-emerald)' }}>{item.solvedCount}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {item.badge && (
                  <div style={{
                    marginTop: '20px',
                    paddingTop: '14px',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)'
                  }}>
                    <Trophy size={14} style={{ color: 'var(--accent-amber)' }} />
                    <span>{item.badge}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
