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
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.35,
          filter: 'brightness(0.7) contrast(1.1)'
        }}
        src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(7, 9, 14, 0.4) 0%, rgba(7, 9, 14, 0.85) 100%)'
      }} />
    </div>
  );
}
