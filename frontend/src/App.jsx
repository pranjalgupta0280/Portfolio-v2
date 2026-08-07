import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VideoBackground from './components/VideoBackground';

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

export default function App() {
  const { isAuthenticated } = useAuth();
  const { loading } = usePortfolio();

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
        background: '#07090e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        color: 'var(--text-secondary)'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '3px solid rgba(0, 245, 212, 0.2)',
          borderTopColor: 'var(--accent-cyan)',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        <p style={{ fontSize: '0.9rem', fontFamily: 'var(--font-code)', color: 'var(--accent-cyan)' }}>INITIALIZING SPATIAL SYSTEM...</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#07090e' }}>
      {/* Full-Screen DNA Video Background across ALL pages */}
      <VideoBackground />

      {/* Public Glass Navbar */}
      <Navbar onOpenAdmin={handleOpenAdmin} />

      {/* Page Routes */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/dsa" element={<DsaPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Footer */}
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
