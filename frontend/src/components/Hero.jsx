import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Activity, Download, Github, Linkedin, Twitter, Mail } from 'lucide-react';
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
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
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span className="tech-tag" style={{ color: 'var(--accent-cyan)' }}>
                INDEPENDENT PRACTICE • 2025–26
              </span>
            </div>

            <h1 style={{ fontSize: '3.6rem', lineHeight: '1.08', marginBottom: '20px', letterSpacing: '-0.03em' }}>
              {profile.name ? (
                <>Hi, I'm <span className="gradient-text">{profile.name}</span></>
              ) : (
                <>Code with <br /><span className="gradient-text">spatial intent.</span></>
              )}
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              marginBottom: '36px',
              maxWidth: '560px',
              lineHeight: '1.7'
            }}>
              {profile.shortIntro || 'I design and engineer digital experiences that make complex ideas feel immediate, tactile, and quietly inevitable.'}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
              <Link to="/projects" className="btn-cyan">
                <span>Explore selected work</span>
                <ArrowUpRight size={18} />
              </Link>

              <Link to="/contact" className="btn-dark-pill">
                <span>Start a conversation</span>
              </Link>

              {profile.resumeUrl && (
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-dark-pill">
                  <Download size={18} />
                  <span>Resume</span>
                </a>
              )}
            </div>

            {/* Social Connection Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-code)', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                SYSTEM LINKS:
              </span>
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                  <Github size={18} />
                </a>
              )}
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                  <Linkedin size={18} />
                </a>
              )}
              {profile.twitterUrl && (
                <a href={profile.twitterUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                  <Twitter size={18} />
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} style={{ color: 'var(--text-secondary)' }}>
                  <Mail size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Right Live Interactive Widget */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="glass-panel" style={{
              padding: '28px',
              maxWidth: '420px',
              width: '100%',
              background: 'rgba(12, 15, 23, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              position: 'relative',
              boxShadow: 'var(--shadow-glass)'
            }}>
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
                  <div
                    key={i}
                    onClick={() => setActiveSpatialIndex(i)}
                    style={{
                      height: '46px',
                      borderRadius: '8px',
                      background: i === activeSpatialIndex ? 'var(--accent-cyan)' : block.color,
                      border: i === activeSpatialIndex ? '1px solid #fff' : '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: i === activeSpatialIndex ? 'var(--shadow-glow-cyan)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
