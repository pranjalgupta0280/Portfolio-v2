import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShieldCheck, Square, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

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

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: scrolled ? 'rgba(248, 249, 250, 0.95)' : 'rgba(248, 249, 250, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-hairline)',
      transition: 'all 0.2s ease',
      padding: '14px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <Link to="/" onClick={handleLinkClick} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          <Square size={16} fill="var(--text-primary)" style={{ color: 'var(--text-primary)' }} />
          <span>PORTFOLIO</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ alignItems: 'center', gap: '20px' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              style={({ isActive }) => ({
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: '0.85rem',
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
              padding: '6px 12px',
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

        {/* Mobile Hamburger Toggle Button */}
        <div className="mobile-toggle-btn" style={{ alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onOpenAdmin}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-hairline)',
              background: isAuthenticated ? '#f0fdf4' : 'var(--bg-surface)',
              color: isAuthenticated ? '#166534' : 'var(--text-primary)',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}
          >
            <ShieldCheck size={14} />
            <span>{isAuthenticated ? 'Active' : 'Admin'}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              padding: '6px',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-hairline)',
              background: 'var(--bg-surface)'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="mobile-drawer"
            style={{
              overflow: 'hidden',
              background: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border-hairline)',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div className="container" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={handleLinkClick}
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '1rem',
                    fontWeight: isActive ? '600' : '400',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  })}
                >
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
