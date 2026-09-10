import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, Tag, X, ChevronRight, Search } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

export default function BlogsPage() {
  const { data } = usePortfolio();
  const { slug } = useParams();
  const navigate = useNavigate();
  const blogs = data.blogs || [];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBlogModal, setActiveBlogModal] = useState(null);

  useEffect(() => {
    if (slug && blogs.length > 0) {
      const found = blogs.find(b => b.slug === slug || b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
      if (found) {
        setActiveBlogModal(found);
      }
    }
  }, [slug, blogs]);

  const handleOpenBlog = (blog) => {
    setActiveBlogModal(blog);
    navigate(`/blogs/${blog.slug}`, { replace: false });
  };

  const handleCloseBlog = () => {
    setActiveBlogModal(null);
    navigate('/blogs', { replace: false });
  };

  const categories = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];

  const filteredBlogs = blogs.filter(b => {
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (b.subtitle && b.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (b.tags && b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <section className="section-padding" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="section-header">
            <span className="kicker-tag">ESSAYS & TECHNICAL WRITING</span>
            <h2 className="section-title">Articles & Blog</h2>
            <p className="section-subtitle">
              Long-form thoughts on system design, UI restraint, algorithms, and web engineering.
            </p>
          </div>

          {/* Search Bar & Category Filters */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '36px'
          }}>
            <div style={{ position: 'relative', maxWidth: '480px' }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                placeholder="Search articles by title, tag, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 40px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-hairline)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {categories.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
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
          </div>

          {/* Blog Articles Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <AnimatePresence mode="wait">
              {filteredBlogs.length === 0 ? (
                <div className="editorial-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No articles found matching your criteria.
                </div>
              ) : (
                filteredBlogs.map((blog, idx) => (
                  <motion.div
                    key={blog._id || idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    className="editorial-card"
                    style={{
                      padding: '24px',
                      display: 'grid',
                      gridTemplateColumns: blog.coverImageUrl ? '1fr 200px' : '1fr',
                      gap: '24px',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleOpenBlog(blog)}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span className="kicker-tag" style={{ fontSize: '0.7rem' }}>{blog.category || 'ENGINEERING'}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-code)' }}>
                          {blog.publishedDate}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} />
                          {blog.readTime}
                        </span>
                      </div>

                      <h3 className="writing-title" style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '8px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                        {blog.title}
                      </h3>

                      {blog.subtitle && (
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '16px', lineHeight: '1.6' }}>
                          {blog.subtitle}
                        </p>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {blog.tags?.map((tag) => (
                            <span key={tag} className="pill-tag" style={{ fontSize: '0.7rem' }}>
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                          <span>Read article</span>
                          <ChevronRight size={14} />
                        </div>
                      </div>
                    </div>

                    {blog.coverImageUrl && (
                      <div style={{ height: '130px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-hairline)' }}>
                        <img
                          src={blog.coverImageUrl}
                          alt={blog.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Blog Article Reader Modal */}
        <AnimatePresence>
          {activeBlogModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 2000,
                background: 'rgba(0, 0, 0, 0.45)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px'
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                className="editorial-card"
                style={{
                  maxWidth: '720px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  padding: '36px',
                  position: 'relative'
                }}
              >
                <button
                  onClick={handleCloseBlog}
                  style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--text-secondary)' }}
                >
                  <X size={20} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span className="kicker-tag">{activeBlogModal.category}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{activeBlogModal.publishedDate}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>• {activeBlogModal.readTime} read</span>
                </div>

                <h1 style={{ fontSize: '2rem', lineHeight: '1.25', fontWeight: '600', marginBottom: '12px', letterSpacing: '-0.03em' }}>
                  {activeBlogModal.title}
                </h1>

                {activeBlogModal.subtitle && (
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
                    {activeBlogModal.subtitle}
                  </p>
                )}

                {activeBlogModal.coverImageUrl && (
                  <img
                    src={activeBlogModal.coverImageUrl}
                    alt={activeBlogModal.title}
                    style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '28px' }}
                  />
                )}

                <div style={{
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  lineHeight: '1.8',
                  whiteSpace: 'pre-line',
                  marginBottom: '32px'
                }}>
                  {activeBlogModal.content}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '20px', borderTop: '1px solid var(--border-hairline)' }}>
                  {activeBlogModal.tags?.map((tag) => (
                    <span key={tag} className="pill-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
