import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import DsaPage from './pages/DsaPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import { useAuth } from './context/AuthContext';
import { usePortfolio } from './context/PortfolioContext';

import BlogsPage from './pages/BlogsPage';
import ResumePage from './pages/ResumePage';

export default function App() {
  const { isAuthenticated } = useAuth();
  const { loading } = usePortfolio();
  const location = useLocation();

  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const handleOpenAdmin = () => {
    setAdminModalOpen(true);
  };

  const handleCloseAdmin = () => {
    setAdminModalOpen(false);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '12px',
        color: 'var(--text-secondary)'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid var(--border-hairline)',
          borderTopColor: 'var(--text-primary)',
          animation: 'spin 0.8s linear infinite'
        }} />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Loading portfolio system...</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Public Navbar */}
      <Navbar onOpenAdmin={handleOpenAdmin} />

      {/* Slide-wise Page Routes */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ width: '100%' }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/dsa" element={<DsaPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blogs/:slug" element={<BlogsPage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Minimalist Footer */}
      <Footer />

      {/* Admin Auth / Dashboard Gate Modal */}
      {adminModalOpen && (
        isAuthenticated ? (
          <AdminDashboard onClose={handleCloseAdmin} />
        ) : (
          <AdminLogin onClose={handleCloseAdmin} />
        )
      )}
    </div>
  );
}

