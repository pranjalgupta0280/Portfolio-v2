import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import { usePortfolio } from '../context/PortfolioContext';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Command } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { data } = usePortfolio();
  const blogs = data?.blogs || [];

  return (
    <div>
      <Hero />

      {/* Writing / Technical Notes Section */}
      {blogs.length > 0 && (
        <section className="section-padding" style={{ borderBottom: '1px solid var(--border-hairline)' }}>
          <div className="container">
            <div className="section-header" style={{ marginBottom: '24px' }}>
              <span className="kicker-tag">MEMOIRS & ESSAYS</span>
              <h2 className="section-title">Writing & Notes</h2>
              <p className="section-subtitle">
                Thoughts on software engineering, UI restraint, and system design.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '32px' }}>
              {blogs.slice(0, 4).map((item) => (
                <Link
                  key={item._id || item.slug}
                  to={`/blogs/${item.slug}`}
                  className="writing-row"
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <BookOpen size={15} style={{ color: 'var(--text-tertiary)' }} />
                    <span className="writing-title" style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                      {item.title}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                    <span>{item.readTime}</span>
                    <span style={{ fontFamily: 'var(--font-code)' }}>{item.publishedDate}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Stitch Kbd Shortcut Feature Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-hairline)',
              background: 'var(--bg-surface)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)'
            }}>
              <Command size={14} />
              <span>Press</span>
              <kbd className="kbd-badge">⌘</kbd>
              <span>+</span>
              <kbd className="kbd-badge">K</kbd>
              <span>to open quick navigation</span>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Preview */}
      <Projects />
    </div>
  );
}

