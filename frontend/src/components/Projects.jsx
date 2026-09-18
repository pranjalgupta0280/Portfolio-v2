import React, { useState } from 'react';
import { ExternalLink, Github, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export default function Projects() {
  const { data } = usePortfolio();
  const projects = data.projects || [];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 3;

  const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <div className="section-header">
          <span className="kicker-tag">SELECTED WORK</span>
          <h2 className="section-title">Projects & Systems</h2>
          <p className="section-subtitle">
            Editorial showcase of engineering work, web apps, and digital products.
          </p>
        </div>

        {/* Category Filters */}
        {categories.length > 1 && (
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '32px'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: selectedCategory === cat ? 'var(--primary-ink)' : 'transparent',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: '500',
                  fontSize: '0.8rem',
                  border: '1px solid var(--border-hairline)',
                  transition: 'var(--transition-fast)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Minimalist Editorial Projects Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <AnimatePresence mode="wait">
            {paginatedProjects.map((proj, idx) => (
              <motion.div 
                key={proj._id || idx}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="editorial-card project-card-item"
                style={{
                  padding: '20px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px',
                  alignItems: 'center'
                }}
              >
                {/* Left Text & Details */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                    <span className="kicker-tag" style={{ fontSize: '0.7rem' }}>{proj.category || 'PROJECT'}</span>
                    {proj.featured && (
                      <span className="pill-tag" style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.65rem' }}>
                        FEATURED
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                    {proj.title}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '14px', lineHeight: '1.55' }}>
                    {proj.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                    {proj.techStack?.map((t) => (
                      <span key={t} className="pill-tag">{t}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => setActiveModalProject(proj)}
                      className="btn-outline"
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                      <Eye size={14} />
                      <span>Details</span>
                    </button>

                    {proj.liveDemoUrl && (
                      <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                        <ExternalLink size={14} />
                        <span>Demo</span>
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                        <Github size={14} />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Image Container */}
                <div style={{ height: '160px', width: '100%', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-hairline)' }}>
                  <img
                    src={proj.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'}
                    alt={proj.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '32px'
          }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn-outline"
              style={{ padding: '6px 12px', fontSize: '0.8rem', opacity: currentPage === 1 ? 0.4 : 1 }}
            >
              <ChevronLeft size={14} />
              <span>Previous</span>
            </button>

            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '0 8px' }}>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn-outline"
              style={{ padding: '6px 12px', fontSize: '0.8rem', opacity: currentPage === totalPages ? 0.4 : 1 }}
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 2000,
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="editorial-card"
              style={{
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '28px',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setActiveModalProject(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--text-secondary)' }}
              >
                <X size={20} />
              </button>

              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{activeModalProject.title}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>{activeModalProject.subtitle}</p>

              <img
                src={activeModalProject.imageUrl}
                alt={activeModalProject.title}
                style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}
              />

              <p style={{ color: 'var(--text-primary)', lineHeight: '1.65', fontSize: '0.95rem', marginBottom: '20px' }}>
                {activeModalProject.fullDescription || activeModalProject.description}
              </p>

              <div style={{ display: 'flex', gap: '12px' }}>
                {activeModalProject.liveDemoUrl && (
                  <a href={activeModalProject.liveDemoUrl} target="_blank" rel="noreferrer" className="btn-primary">
                    <span>Live Demo</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                {activeModalProject.githubUrl && (
                  <a href={activeModalProject.githubUrl} target="_blank" rel="noreferrer" className="btn-outline">
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
