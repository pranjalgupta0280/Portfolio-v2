import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import { usePortfolio } from '../context/PortfolioContext';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Code, Cpu, Trophy, Terminal } from 'lucide-react';

export default function HomePage() {
  const { data } = usePortfolio();
  const skills = data.skills || [];
  const projects = data.projects || [];
  const dsaProfiles = data.dsaProfiles || [];

  return (
    <div>
      <Hero />

      {/* Spatial Systems Metrics Teaser */}
      <section className="section-padding" style={{ position: 'relative', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            <Link to="/projects" className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="tech-tag">COLLECTION</span>
                <ArrowUpRight size={20} style={{ color: 'var(--accent-cyan)' }} />
              </div>
              <h3 style={{ fontSize: '2.4rem', color: '#fff' }}>{projects.length}+</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Production-ready SaaS Apps & Systems</p>
            </Link>

            <Link to="/skills" className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="tech-tag">CAPABILITIES</span>
                <ArrowUpRight size={20} style={{ color: 'var(--accent-purple)' }} />
              </div>
              <h3 style={{ fontSize: '2.4rem', color: '#fff' }}>{skills.length}+</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Technologies & Technical Skillsets</p>
            </Link>

            <Link to="/dsa" className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="tech-tag">COMPETITIVE</span>
                <ArrowUpRight size={20} style={{ color: 'var(--accent-cyan)' }} />
              </div>
              <h3 style={{ fontSize: '2.4rem', color: '#fff' }}>{dsaProfiles.length}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Algorithmic & Code Platforms</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <Projects />
    </div>
  );
}
