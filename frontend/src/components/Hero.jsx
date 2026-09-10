import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Download, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export default function Hero() {
  const { data } = usePortfolio();
  const profile = data.profile || {};
  const projects = data.projects || [];
  const skills = data.skills || [];
  const dsaProfiles = data.dsaProfiles || [];

  return (
    <section style={{
      paddingTop: '140px',
      paddingBottom: '60px',
      borderBottom: '1px solid var(--border-hairline)'
    }}>
      <div className="container">
        {/* Kicker Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          <span className="kicker-tag">
            {profile.title || 'FULL-STACK ENGINEER & ARCHITECT'}
          </span>
        </motion.div>

        {/* Hero Title & Bio */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ maxWidth: '680px', marginBottom: '32px' }}
        >
          <h1 style={{ fontSize: '2.75rem', lineHeight: '1.15', fontWeight: '600', marginBottom: '20px', letterSpacing: '-0.035em' }}>
            {profile.name ? profile.name : 'Crafting software with intentional restraint.'}
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.75' }}>
            {profile.shortIntro || 'Designing and engineering long-form web platforms, software systems, and resilient infrastructure focused on signal over noise.'}
          </p>
        </motion.div>

        {/* Call to Actions & Resume */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '48px' }}
        >
          <Link to="/projects" className="btn-primary">
            <span>Selected Work</span>
            <ArrowUpRight size={16} />
          </Link>

          <Link to="/contact" className="btn-outline">
            <span>Get in Touch</span>
          </Link>

          {profile.resumeUrl && (
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-outline">
              <Download size={16} />
              <span>Resume</span>
            </a>
          )}
        </motion.div>

        {/* Metric Counters (Minimalist Editorial Multi-column Row) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            paddingTop: '32px',
            borderTop: '1px solid var(--border-hairline)',
            maxWidth: '560px'
          }}
        >
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {projects.length}+
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
              Shipped Projects
            </div>
          </div>

          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {skills.length}+
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
              Technologies
            </div>
          </div>

          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {dsaProfiles.length}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
              Code Profiles
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

