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
      {/* 3D Inverted Glowing DNA Strand Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.55,
          filter: 'invert(1) hue-rotate(180deg) brightness(1.2) contrast(1.2)'
        }}
        src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"
      />
    </div>
  );
}
