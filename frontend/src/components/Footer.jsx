import React from 'react';
import { ArrowUp, Square } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Footer() {
  const { data } = usePortfolio();
  const profile = data.profile || {};

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      padding: '40px 0',
      borderTop: '1px solid var(--border-hairline)',
      background: 'var(--bg-primary)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Square size={14} fill="var(--text-primary)" style={{ color: 'var(--text-primary)' }} />
          <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
            {profile.name || 'Portfolio'}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
            © {new Date().getFullYear()} • Crafted with editorial intent.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            <span>Shortcut</span>
            <kbd className="kbd-badge">Shift</kbd>
            <span>+</span>
            <kbd className="kbd-badge">↑</kbd>
          </div>

          <button
            onClick={scrollToTop}
            className="btn-outline"
            style={{
              padding: '6px 12px',
              fontSize: '0.8rem'
            }}
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

