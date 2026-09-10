import React from 'react';
import { ExternalLink, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export default function DsaProfiles() {
  const { data } = usePortfolio();
  const dsaProfiles = data.dsaProfiles || [];

  return (
    <section id="dsa" className="section-padding">
      <div className="container">
        <div className="section-header">
          <span className="kicker-tag">PROBLEM SOLVING</span>
          <h2 className="section-title">DSA & Coding Profiles</h2>
          <p className="section-subtitle">
            Track record across competitive programming platforms and code hosts.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {dsaProfiles.map((item, idx) => (
            <motion.div 
              key={item._id || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="editorial-card" 
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '600' }}>
                    <Code2 size={16} />
                    <span>{item.platform}</span>
                  </div>

                  <a
                    href={item.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>@{item.handle}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {item.rating && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Rating:</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{item.rating}</strong>
                    </div>
                  )}
                  {item.maxRating && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Max Rating:</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{item.maxRating}</strong>
                    </div>
                  )}
                  {item.solvedCount && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Solved:</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{item.solvedCount}+</strong>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-hairline)' }}>
                <a
                  href={item.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '8px',
                    fontSize: '0.8rem'
                  }}
                >
                  <span>View Profile</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

