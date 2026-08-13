import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import { usePortfolio } from '../context/PortfolioContext';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 245, 212, 0.2)' }}
              style={{ borderRadius: '22px' }}
            >
              <Link to="/projects" className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', borderRadius: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="tech-tag">COLLECTION</span>
                  <ArrowUpRight size={20} style={{ color: 'var(--accent-cyan)' }} />
                </div>
                <h3 style={{ fontSize: '2.6rem', color: '#fff', fontFamily: 'var(--font-code)' }}>{projects.length}+</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Production-ready SaaS Apps & Systems</p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(168, 85, 247, 0.2)' }}
              style={{ borderRadius: '22px' }}
            >
              <Link to="/skills" className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', borderRadius: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="tech-tag">CAPABILITIES</span>
                  <ArrowUpRight size={20} style={{ color: 'var(--accent-purple)' }} />
                </div>
                <h3 style={{ fontSize: '2.6rem', color: '#fff', fontFamily: 'var(--font-code)' }}>{skills.length}+</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Technologies & Technical Skillsets</p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 245, 212, 0.2)' }}
              style={{ borderRadius: '22px' }}
            >
              <Link to="/dsa" className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', borderRadius: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="tech-tag">COMPETITIVE</span>
                  <ArrowUpRight size={20} style={{ color: 'var(--accent-cyan)' }} />
                </div>
                <h3 style={{ fontSize: '2.6rem', color: '#fff', fontFamily: 'var(--font-code)' }}>{dsaProfiles.length}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Algorithmic & Code Platforms</p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <Projects />
    </div>
  );
}
