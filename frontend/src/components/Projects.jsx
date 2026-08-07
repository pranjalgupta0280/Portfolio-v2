import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, Layers, Eye, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Projects() {
  const { data } = usePortfolio();
  const projects = data.projects || [];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative', background: 'rgba(15, 23, 42, 0.3)' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge">Featured Portfolio Work</span>
          <h2 className="section-title">Crafted Software & Apps</h2>
          <p className="section-subtitle">
            A selection of production-ready SaaS apps, open-source projects, and full-stack systems.
          </p>
        </div>

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
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  background: selectedCategory === cat ? 'var(--gradient-brand)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  border: '1px solid var(--border-subtle)',
                  transition: 'var(--transition-fast)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px'
        }}>
          {filteredProjects.map((proj) => (
            <div key={proj._id} className="glass-panel" style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'var(--transition-smooth)'
            }}>
              {/* Project Card Cover Image */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={proj.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                  alt={proj.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                />
                {proj.featured && (
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gradient-brand)',
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    Featured
                  </span>
                )}
              </div>

              {/* Project Card Content */}
              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '4px' }}>{proj.title}</h3>
                  {proj.subtitle && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--accent-indigo)', fontWeight: '600', marginBottom: '12px' }}>
                      {proj.subtitle}
                    </p>
                  )}

                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.6' }}>
                    {proj.description}
                  </p>

                  {/* Tech Stack Pills */}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                      {proj.techStack.map((tech) => (
                        <span key={tech} style={{
                          padding: '3px 10px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--text-muted)',
                          fontSize: '0.775rem',
                          fontFamily: 'var(--font-code)',
                          border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer Action Links */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-subtle)'
                }}>
                  <button
                    onClick={() => setActiveModalProject(proj)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: 'var(--accent-indigo)'
                    }}
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                        <Github size={18} />
                      </a>
                    )}
                    {proj.liveDemoUrl && (
                      <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: 'var(--accent-emerald)'
                      }}>
                        <span>Live Demo</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2000,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '650px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            position: 'relative'
          }}>
            <button
              onClick={() => setActiveModalProject(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>

            <img
              src={activeModalProject.imageUrl}
              alt={activeModalProject.title}
              style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}
            />

            <h2 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>{activeModalProject.title}</h2>
            <p style={{ color: 'var(--accent-indigo)', fontWeight: '600', marginBottom: '16px' }}>{activeModalProject.subtitle}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
              {activeModalProject.techStack?.map((t) => (
                <span key={t} className="badge">{t}</span>
              ))}
            </div>

            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
              {activeModalProject.fullDescription || activeModalProject.description}
            </p>

            <div style={{ display: 'flex', gap: '16px' }}>
              {activeModalProject.liveDemoUrl && (
                <a href={activeModalProject.liveDemoUrl} target="_blank" rel="noreferrer" className="btn-primary">
                  <span>Visit Live Demo</span>
                  <ExternalLink size={16} />
                </a>
              )}
              {activeModalProject.githubUrl && (
                <a href={activeModalProject.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                  <Github size={16} />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
