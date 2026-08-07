import React from 'react';
import { Download, ArrowRight, Github, Linkedin, Twitter, Mail, MapPin, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Hero() {
  const { data } = usePortfolio();
  const profile = data.profile || {};

  return (
    <section style={{
      position: 'relative',
      paddingTop: '160px',
      paddingBottom: '100px',
      overflow: 'hidden'
    }}>
      {/* Background Cover Overlay */}
      {profile.coverImageUrl && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '420px',
          backgroundImage: `url(${profile.coverImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 0
        }} />
      )}

      {/* Radial Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '350px',
        background: 'var(--gradient-glow)',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Left Text Content */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span className="badge">
                <Sparkles size={14} />
                <span>Available for Tech Opportunities</span>
              </span>
            </div>

            <h1 style={{ fontSize: '3.2rem', lineHeight: '1.15', marginBottom: '16px' }}>
              Hi, I'm <span className="gradient-text">{profile.name || 'Alex Dev'}</span>
            </h1>

            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: '600',
              color: 'var(--accent-indigo)',
              marginBottom: '20px'
            }}>
              {profile.title || 'Senior Full Stack & AI Systems Engineer'}
            </h2>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              marginBottom: '32px',
              maxWidth: '560px',
              lineHeight: '1.7'
            }}>
              {profile.shortIntro || 'Crafting modern SaaS platforms, high-performance distributed web systems, and intuitive user experiences with extreme precision.'}
            </p>

            {/* CTA Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
              <a href="#projects" className="btn-primary">
                <span>View Projects</span>
                <ArrowRight size={18} />
              </a>

              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  <Download size={18} />
                  <span>Download Resume</span>
                </a>
              )}
            </div>

            {/* Social Handles */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: '600' }}>CONNECT:</span>
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'var(--transition-fast)' }}>
                  <Github size={20} />
                </a>
              )}
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'var(--transition-fast)' }}>
                  <Linkedin size={20} />
                </a>
              )}
              {profile.twitterUrl && (
                <a href={profile.twitterUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'var(--transition-fast)' }}>
                  <Twitter size={20} />
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} style={{ color: 'var(--text-secondary)', transition: 'var(--transition-fast)' }}>
                  <Mail size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Right Floating Profile Avatar Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="glass-panel float-slow" style={{
              padding: '24px',
              maxWidth: '380px',
              width: '100%',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '180px',
                height: '180px',
                margin: '0 auto 20px auto',
                borderRadius: '50%',
                padding: '4px',
                background: 'var(--gradient-brand)',
                boxShadow: 'var(--shadow-glow)'
              }}>
                <img
                  src={profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                  alt={profile.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              <h3 style={{ fontSize: '1.3rem', marginBottom: '4px' }}>{profile.name}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>{profile.location || 'San Francisco, CA'}</p>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                fontSize: '0.8rem',
                fontWeight: '600',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#34d399',
                  boxShadow: '0 0 10px #34d399'
                }} />
                <span>Open for Full-time & Contracts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
