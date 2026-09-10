import React from 'react';
import { Download, ExternalLink, ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResumePage() {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <ArrowLeft size={14} />
              <span>Back to Portfolio</span>
            </Link>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              Curriculum Vitae / Resume
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Pranjal Gupta — Full Stack Engineer & Agentic AI Systems Developer
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href="/resume.pdf"
              download="Pranjal_Gupta_Resume.pdf"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Download size={16} />
              <span>Download PDF</span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <ExternalLink size={16} />
              <span>Open in New Tab</span>
            </a>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="editorial-card" style={{
          width: '100%',
          height: '82vh',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: '1px solid var(--border-hairline)',
          background: 'var(--bg-surface)'
        }}>
          <iframe
            src="/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
            title="Pranjal Gupta Resume PDF"
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
}
