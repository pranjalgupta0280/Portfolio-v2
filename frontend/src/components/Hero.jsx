import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Activity, Download, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export default function Hero() {
  const { data } = usePortfolio();
  const profile = data.profile || {};

  const [activeSpatialIndex, setActiveSpatialIndex] = useState(0);

  const spatialBlocks = [
    { color: '#00f5d4', label: 'CYAN_GRID' },
    { color: 'rgba(255,255,255,0.06)', label: 'IDLE' },
    { color: 'rgba(255,255,255,0.06)', label: 'IDLE' },
    { color: '#a855f7', label: 'PURPLE_NODE' },
    { color: 'rgba(255,255,255,0.06)', label: 'IDLE' },
    { color: 'rgba(255,255,255,0.06)', label: 'IDLE' },
    { color: 'rgba(255,255,255,0.06)', label: 'IDLE' },
    { color: 'rgba(0,245,212,0.2)', label: 'ACTIVE' },
    { color: 'rgba(255,255,255,0.06)', label: 'IDLE' },
    { color: 'rgba(168,85,247,0.3)', label: 'NODE' },
    { color: 'rgba(255,255,255,0.06)', label: 'IDLE' },
    { color: 'rgba(255,255,255,0.06)', label: 'IDLE' }
  ];

  return (
    <section style={{
      position: 'relative',
      paddingTop: '160px',
      paddingBottom: '90px',
      overflow: 'hidden'
    }}>
      {/* Top Header System Bar */}
      <div className="container" style={{ marginBottom: '40px', position: 'relative', zIndex: 1 }}>
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}
        >
          <div className="tech-tag">
            <span>CREATIVE DEVELOPER / SYSTEM 01</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#00f5d4',
              boxShadow: '0 0 12px #00f5d4'
            }} className="glow-cyan-pulse" />
            <span className="tech-tag" style={{ color: 'var(--text-secondary)' }}>AVAILABLE FOR SELECT BUILDS</span>
          </div>
        </motion.div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Left Content with Framer Motion Stagger */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{ marginBottom: '16px' }}
            >
              <span className="tech-tag" style={{ color: 'var(--accent-cyan)' }}>
                INDEPENDENT PRACTICE • 2025–26
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ fontSize: '3.6rem', lineHeight: '1.08', marginBottom: '20px', letterSpacing: '-0.03em' }}
            >
              {profile.name ? (
                <>Hi, I'm <span className="gradient-text">{profile.name}</span></>
              ) : (
                <>Code with <br /><span className="gradient-text">spatial intent.</span></>
              )}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-secondary)',
                marginBottom: '36px',
                maxWidth: '560px',
                lineHeight: '1.7'
              }}
            >
              {profile.shortIntro || 'I design and engineer digital experiences that make complex ideas feel immediate, tactile, and quietly inevitable.'}
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Link to="/projects" className="btn-cyan">
                  <span>Explore selected work</span>
                  <ArrowUpRight size={18} />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Link to="/contact" className="btn-dark-pill">
                  <span>Start a conversation</span>
                </Link>
              </motion.div>

              {profile.resumeUrl && (
                <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                  <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-dark-pill">
                    <Download size={18} />
                    <span>Resume</span>
                  </a>
                </motion.div>
              )}
            </motion.div>

            {/* Social Connection Links */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
            >
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-code)', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                SYSTEM LINKS:
              </span>
              {profile.githubUrl && (
                <motion.a whileHover={{ scale: 1.2, color: 'var(--accent-cyan)' }} href={profile.githubUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                  <Github size={18} />
                </motion.a>
              )}
              {profile.linkedinUrl && (
                <motion.a whileHover={{ scale: 1.2, color: 'var(--accent-cyan)' }} href={profile.linkedinUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                  <Linkedin size={18} />
                </motion.a>
              )}
              {profile.twitterUrl && (
                <motion.a whileHover={{ scale: 1.2, color: 'var(--accent-cyan)' }} href={profile.twitterUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                  <Twitter size={18} />
                </motion.a>
              )}
              {profile.email && (
                <motion.a whileHover={{ scale: 1.2, color: 'var(--accent-cyan)' }} href={`mailto:${profile.email}`} style={{ color: 'var(--text-secondary)' }}>
                  <Mail size={18} />
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Live Interactive Widget with Motion Hover */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <motion.div 
              whileHover={{ y: -6, boxShadow: '0 25px 50px rgba(0, 245, 212, 0.15)' }}
              className="glass-panel" 
              style={{
                padding: '28px',
                maxWidth: '420px',
                width: '100%',
                background: 'rgba(12, 15, 23, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                position: 'relative',
                boxShadow: 'var(--shadow-glass)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span className="tech-tag" style={{ fontSize: '0.7rem' }}>SPATIAL FIELD / LIVE</span>
                <Activity size={18} style={{ color: 'var(--accent-purple)' }} />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '10px',
                marginBottom: '28px'
              }}>
                {spatialBlocks.map((block, i) => (
                  <motion.div
                    key={i}
                    onClick={() => setActiveSpatialIndex(i)}
                    whileHover={{ scale: 1.15, borderRadius: '12px' }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      height: '46px',
                      borderRadius: '8px',
                      background: i === activeSpatialIndex ? 'var(--accent-cyan)' : block.color,
                      border: i === activeSpatialIndex ? '1px solid #fff' : '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: i === activeSpatialIndex ? 'var(--shadow-glow-cyan)' : 'none',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease, border 0.3s ease'
                    }}
                  />
                ))}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-code)',
                color: 'var(--text-muted)',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <span>X 041.6</span>
                <span>Y 72.9</span>
                <span>Z 00.4</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
