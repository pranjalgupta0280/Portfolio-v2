import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, Layers, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section id="projects" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="tech-tag" style={{ color: 'var(--accent-cyan)' }}>Featured Portfolio Work</span>
          <h2 className="section-title">Crafted Software & Apps</h2>
          <p className="section-subtitle">
            A selection of production-ready SaaS apps, open-source projects, and full-stack systems.
          </p>
        </motion.div>

        {/* Category Selector */}
        {categories.length > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '40px'
          }}>
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-full)',
                  background: selectedCategory === cat ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedCategory === cat ? '#000000' : 'var(--text-secondary)',
                  fontWeight: '700',
                  fontSize: '0.875rem',
                  border: selectedCategory === cat ? '1px solid #fff' : '1px solid var(--border-subtle)',
                  boxShadow: selectedCategory === cat ? 'var(--shadow-glow-cyan)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <motion.div 
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px'
          }}
        >
          <AnimatePresence mode="wait">
            {paginatedProjects.map((proj, idx) => (
              <motion.div 
                layout
                key={proj._id || idx}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 245, 212, 0.2)' }}
                className="glass-panel" 
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '24px'
                }}
              >
                {/* Project Cover Image */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <motion.img
                    src={proj.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                    alt={proj.title}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {proj.featured && (
                    <span style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: 'rgba(0, 245, 212, 0.9)',
                      color: '#000',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-code)',
                      fontWeight: '700',
                      letterSpacing: '0.08em'
                    }}>
                      ★ FEATURED BUILD
                    </span>
                  )}
                </div>

                {/* Project Details */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '1.4rem', color: '#ffffff' }}>{proj.title}</h3>
                      <span className="tech-tag" style={{ fontSize: '0.7rem' }}>{proj.category}</span>
                    </div>

                    <p style={{ color: 'var(--accent-purple)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '12px' }}>
                      {proj.subtitle || 'Production Application'}
                    </p>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                      {proj.description}
                    </p>
                  </div>

                  {/* Tech stack badges & action trigger */}
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                      {proj.techStack?.map((t) => (
                        <span key={t} className="cyan-pill-badge" style={{ fontSize: '0.68rem', padding: '3px 10px' }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <motion.button
                        onClick={() => setActiveModalProject(proj)}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="btn-cyan"
                        style={{ padding: '10px 20px', fontSize: '0.85rem' }}
                      >
                        <Eye size={15} />
                        <span>View Details</span>
                      </motion.button>

                      {proj.liveDemoUrl && (
                        <motion.a 
                          href={proj.liveDemoUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          whileHover={{ scale: 1.04, color: 'var(--accent-cyan)' }}
                          className="btn-dark-pill" 
                          style={{ padding: '10px 16px', fontSize: '0.85rem' }}
                        >
                          <ExternalLink size={15} />
                        </motion.a>
                      )}
                      {proj.githubUrl && (
                        <motion.a 
                          href={proj.githubUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          whileHover={{ scale: 1.04, color: 'var(--accent-cyan)' }}
                          className="btn-dark-pill" 
                          style={{ padding: '10px 16px', fontSize: '0.85rem' }}
                        >
                          <Github size={15} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '48px'
          }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: currentPage === 1 ? 'var(--text-muted)' : '#fff',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.5 : 1
              }}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </motion.button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <motion.button
                key={pageNum}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage(pageNum)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: currentPage === pageNum ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
                  color: currentPage === pageNum ? '#000000' : '#ffffff',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  border: currentPage === pageNum ? '1px solid #fff' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  boxShadow: currentPage === pageNum ? 'var(--shadow-glow-cyan)' : 'none'
                }}
              >
                {pageNum}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: currentPage === totalPages ? 'var(--text-muted)' : '#fff',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages ? 0.5 : 1
              }}
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </motion.button>
          </div>
        )}
      </div>

      {/* Project Detail Pop-in Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2000,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <motion.div 
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="glass-panel" 
              style={{
                maxWidth: '650px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '32px',
                position: 'relative',
                border: '1px solid rgba(0, 245, 212, 0.3)',
                boxShadow: '0 25px 50px rgba(0, 245, 212, 0.25)'
              }}
            >
              <motion.button
                whileHover={{ scale: 1.2, rotate: 90 }}
                onClick={() => setActiveModalProject(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  color: 'var(--accent-cyan)',
                  cursor: 'pointer'
                }}
              >
                <X size={24} />
              </motion.button>

              <img
                src={activeModalProject.imageUrl}
                alt={activeModalProject.title}
                style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '16px', marginBottom: '20px' }}
              />

              <h2 style={{ fontSize: '1.8rem', marginBottom: '6px', color: '#ffffff' }}>{activeModalProject.title}</h2>
              <p style={{ color: 'var(--accent-purple)', fontWeight: '600', marginBottom: '16px' }}>{activeModalProject.subtitle}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {activeModalProject.techStack?.map((t) => (
                  <span key={t} className="cyan-pill-badge">{t}</span>
                ))}
              </div>

              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
                {activeModalProject.fullDescription || activeModalProject.description}
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {activeModalProject.liveDemoUrl && (
                  <motion.a whileHover={{ scale: 1.05 }} href={activeModalProject.liveDemoUrl} target="_blank" rel="noreferrer" className="btn-cyan">
                    <span>Visit Live Demo</span>
                    <ExternalLink size={16} />
                  </motion.a>
                )}
                {activeModalProject.githubUrl && (
                  <motion.a whileHover={{ scale: 1.05 }} href={activeModalProject.githubUrl} target="_blank" rel="noreferrer" className="btn-dark-pill">
                    <Github size={16} />
                    <span>GitHub Repository</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
