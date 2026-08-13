import React from 'react';

export default function VideoBackground() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0
    }}>
      {/* 3D Glowing DNA Helix Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.65,
          filter: 'brightness(1.1) contrast(1.2) hue-rotate(140deg)',
          mixBlendMode: 'screen'
        }}
        src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"
      />
      {/* Subtle Gradient Vignette Mask */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(7, 9, 14, 0.25) 0%, rgba(7, 9, 14, 0.75) 100%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
