import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShieldCheck, Square } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'DSA', path: '/dsa' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: scrolled ? 'rgba(248, 249, 250, 0.92)' : 'rgba(248, 249, 250, 0.6)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-hairline)',
      transition: 'all 0.2s ease',
      padding: '16px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          <Square size={16} fill="var(--text-primary)" style={{ color: 'var(--text-primary)' }} />
          <span>PORTFOLIO</span>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              style={({ isActive }) => ({
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: isActive ? '600' : '400',
                transition: 'var(--transition-fast)',
                borderBottom: isActive ? '1px solid var(--text-primary)' : '1px solid transparent',
                paddingBottom: '2px'
              })}
            >
              {link.name}
            </NavLink>
          ))}

          {/* Admin Portal Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenAdmin}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-hairline)',
              background: isAuthenticated ? '#f0fdf4' : 'var(--bg-surface)',
              color: isAuthenticated ? '#166534' : 'var(--text-primary)',
              fontSize: '0.8rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <ShieldCheck size={14} />
            <span>{isAuthenticated ? 'Admin Active' : 'Admin'}</span>
          </motion.button>
        </nav>
      </div>
    </header>
  );
}

