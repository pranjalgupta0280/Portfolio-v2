import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import DsaProfiles from './components/DsaProfiles';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import { useAuth } from './context/AuthContext';
import { usePortfolio } from './context/PortfolioContext';

export default function App() {
  const { isAuthenticated } = useAuth();
  const { loading, error } = usePortfolio();

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
        gap: '16px',
        color: 'var(--text-secondary)'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '3px solid rgba(99, 102, 241, 0.2)',
          borderTopColor: 'var(--accent-indigo)',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        <p style={{ fontSize: '0.95rem', fontWeight: '500' }}>Loading Portfolio Experience...</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Public Navbar */}
      <Navbar onOpenAdmin={handleOpenAdmin} />

      {/* Public Page Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <DsaProfiles />
        <Projects />
        <Contact />
      </main>

      {/* Public Footer */}
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
