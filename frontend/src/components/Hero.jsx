import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Download, Eye, Github, Linkedin, Twitter, Mail, X, FileText, Award, Code2, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export default function Hero() {
  const { data } = usePortfolio();
  const profile = data.profile || {};
  const projects = data.projects || [];
  const skills = data.skills || [];
  const dsaProfiles = data.dsaProfiles || [];
  const education = data.education || [];

  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <section style={{
      paddingTop: '140px',
      paddingBottom: '60px',
      borderBottom: '1px solid var(--border-hairline)'
    }}>
      <div className="container">
        {/* Kicker Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '20px' }}
        >
          <span className="kicker-tag">
            {profile.title || 'FULL-STACK ENGINEER & AGENTIC AI DEVELOPER'}
          </span>
        </motion.div>

        {/* Hero Title & Rich Bio Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ maxWidth: '780px', marginBottom: '32px' }}
        >
          <h1 style={{ fontSize: '2.85rem', lineHeight: '1.15', fontWeight: '600', marginBottom: '20px', letterSpacing: '-0.035em', color: 'var(--text-primary)' }}>
            {profile.name ? profile.name : 'Pranjal Gupta'}
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: '16px' }}>
            {profile.shortIntro || 'Building scalable web platforms, agentic RAG architectures, multi-tenant B2B systems, and high-performance competitive algorithms.'}
          </p>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-tertiary)', lineHeight: '1.65' }}>
            Computer Science & Engineering student at JSS Academy of Technical Education, Noida. Experienced in React, Node.js, Express, MongoDB, TypeScript, and AI/Agentic RAG pipelines (LangChain, LangGraph, Qdrant Vector Search, NeMo Guardrails).
          </p>
        </motion.div>

        {/* Call to Actions & Resume Dedicated Page Link */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '44px' }}
        >
          <Link to="/resume" className="btn-primary">
            <FileText size={16} />
            <span>View Resume</span>
          </Link>

          <Link to="/projects" className="btn-outline">
            <span>Explore Projects</span>
            <ArrowUpRight size={16} />
          </Link>

          <Link to="/about" className="btn-outline">
            <GraduationCap size={16} />
            <span>Education & Honors</span>
          </Link>

          <Link to="/contact" className="btn-outline">
            <Mail size={16} />
            <span>Get in Touch</span>
          </Link>
        </motion.div>

        {/* Metric Counters & Quick Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '24px',
            paddingTop: '28px',
            borderTop: '1px solid var(--border-hairline)',
            maxWidth: '640px'
          }}
        >
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              1871
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
              LeetCode Knight
            </div>
          </div>

          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              1324 / 3★
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
              Codeforces & CodeChef
            </div>
          </div>

          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {projects.length}+
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
              Built Projects
            </div>
          </div>

          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {skills.length}+
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
              Tech Stack
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Resume View Modal */}
      <AnimatePresence>
        {resumeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 3000,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="editorial-card"
              style={{
                maxWidth: '820px',
                width: '100%',
                maxHeight: '92vh',
                overflowY: 'auto',
                padding: '36px',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setResumeModalOpen(false)}
                style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>

              <div style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '20px', marginBottom: '24px' }}>
                <span className="kicker-tag">CURRICULUM VITAE</span>
                <h2 style={{ fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.03em', marginTop: '4px', marginBottom: '6px' }}>
                  Pranjal Gupta
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  +91 7007855590 | pranjalgupta0280@gmail.com | Noida, Uttar Pradesh
                </p>
              </div>

              {/* Education Section */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '6px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GraduationCap size={16} />
                  <span>EDUCATION</span>
                </h3>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '0.95rem' }}>
                    <span>JSS Academy of Technical Education</span>
                    <span>2023 – Present</span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Bachelor of Technology in Computer Science and Engineering | Noida, UP</div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '0.95rem' }}>
                    <span>United Public School</span>
                    <span>March 2010 – April 2023</span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>High School: 93/100 | Kanpur, UP</div>
                </div>
              </div>

              {/* Technical Skills Section */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '6px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Code2 size={16} />
                  <span>TECHNICAL SKILLS</span>
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <li><strong style={{ color: 'var(--text-primary)' }}>Languages:</strong> Python, TypeScript, C++, Java, C, JavaScript, HTML/CSS</li>
                  <li><strong style={{ color: 'var(--text-primary)' }}>Web Technologies:</strong> React, Node.js, Express, MongoDB, Next.js, Tailwind CSS, Mongoose, Socket.IO, JWT, Bcrypt, Vite.js</li>
                  <li><strong style={{ color: 'var(--text-primary)' }}>AI & Agentic Systems:</strong> LangChain, LangGraph, Agentic RAG, Qdrant (Vector Search), NeMo Guardrails, Semantic Re-ranking</li>
                  <li><strong style={{ color: 'var(--text-primary)' }}>DevOps & Tools:</strong> Git, Docker, CI/CD (GitHub Actions), Vercel, Render, Linux, Postman</li>
                </ul>
              </div>

              {/* Core Featured Projects */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '6px', marginBottom: '12px' }}>
                  KEY PROJECTS
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>Kubernetes Documentation RAG Assistant <span style={{ fontWeight: '400', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>| LangGraph, Qdrant, Gemini, NeMo Guardrails</span></div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Agentic RAG assistant with conversational memory, Qdrant vector search, FlashRank reranking, and NeMo Guardrails safety.</p>
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>Vista ResuAI <span style={{ fontWeight: '400', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>| React, Node.js, MongoDB, Gemini API, SCSS</span></div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Resume optimization platform using Google Gemini API, Multer document parsing, and JWT authentication.</p>
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>TeamSync (B2B SaaS Platform) <span style={{ fontWeight: '400', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>| React, Node.js, MongoDB, TypeScript</span></div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Multi-tenant project management platform with Google OAuth, RBAC session security, and Mongoose transaction safety.</p>
                  </div>
                </div>
              </div>

              {/* Achievements & Academic Highlights */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '6px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={16} />
                  <span>ACHIEVEMENTS & COMPETITION HIGHLIGHTS</span>
                </h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li><strong>Competitive Programming:</strong> Codeforces Pupil (1324), CodeChef 3-Star, LeetCode Knight (1871).</li>
                  <li><strong>Global Competitions:</strong> Meta Hacker Cup: Round 1 Global Rank 4700; Round 2 Global Rank 3100.</li>
                  <li><strong>Hackathons:</strong> SHASTRA Programming Contest, IIT Madras (Finalist).</li>
                </ul>
              </div>

              {/* Actions Footer */}
              <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-hairline)' }}>
                {profile.resumeUrl && (
                  <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-primary">
                    <Download size={14} />
                    <span>Download Original PDF</span>
                  </a>
                )}
                <button onClick={() => setResumeModalOpen(false)} className="btn-outline">
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

