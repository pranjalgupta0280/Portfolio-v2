import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShieldCheck, Terminal, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'DSA Profiles', path: '/dsa' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      backgroundColor: scrolled ? 'rgba(7, 9, 14, 0.88)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      transition: 'all 0.3s ease',
      padding: scrolled ? '14px 0' : '22px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', fontWeight: '800' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--accent-cyan)',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            boxShadow: 'var(--shadow-glow-cyan)'
          }}>
            <Terminal size={18} />
          </div>
          <span style={{ color: '#fff', fontFamily: 'var(--font-heading)' }}>
            System<span style={{ color: 'var(--accent-cyan)' }}>.01</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: isActive ? '700' : '500',
                transition: 'var(--transition-fast)',
                borderBottom: isActive ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                paddingBottom: '4px'
              })}
            >
              {link.name}
            </NavLink>
          ))}

          {/* Admin Lock Button */}
          <button
            onClick={onOpenAdmin}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: isAuthenticated ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(0, 245, 212, 0.3)',
              background: isAuthenticated ? 'rgba(16, 185, 129, 0.12)' : 'rgba(0, 245, 212, 0.08)',
              color: isAuthenticated ? '#34d399' : 'var(--accent-cyan)',
              fontSize: '0.825rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          >
            <ShieldCheck size={16} />
            <span>{isAuthenticated ? 'Admin Active' : 'Admin Portal'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
