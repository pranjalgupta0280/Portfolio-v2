import React, { useEffect, useRef } from 'react';

export default function SpatialCyberBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse Damped Inertia Physics
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 140
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Particle Class (#00f5d4 Cyan & #a855f7 Purple Theme)
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.8 + 1.2;
        this.color = Math.random() > 0.45 ? '#00f5d4' : '#a855f7';
        this.alpha = Math.random() * 0.45 + 0.25;
      }

      update() {
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        this.x += this.vx;
        this.y += this.vy;

        // Smooth Repulsion
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - dist) / 100;
          this.x -= Math.cos(angle) * force * 2;
          this.y -= Math.sin(angle) * force * 2;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    let particles = [];
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((width * height) / 16000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    // 120 FPS Silk Smooth Render Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth Mouse Lerp (Damped Physics)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles to mouse
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = '#00f5d4';
          ctx.globalAlpha = (1 - dist / mouse.radius) * 0.4;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Connect particles to neighboring particles
        for (let j = i + 1; j < particles.length; j++) {
          const pdx = particles[i].x - particles[j].x;
          const pdy = particles[i].y - particles[j].y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pdist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(0, 245, 212, 0.12)';
            ctx.globalAlpha = (1 - pdist / 100) * 0.25;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
      background: '#06080e'
    }}>
      {/* Cyan Ambient Aura Orb */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '25%',
        width: '50vw',
        height: '50vh',
        transform: 'translate3d(-50%, -50%, 0)',
        background: 'radial-gradient(circle, rgba(0, 245, 212, 0.15) 0%, rgba(0, 245, 212, 0.03) 55%, transparent 75%)',
        borderRadius: '50%',
        animation: 'cyanOrbPulse 9s ease-in-out infinite alternate',
        willChange: 'transform, opacity',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Electric Purple Ambient Aura Orb */}
      <div style={{
        position: 'absolute',
        top: '65%',
        right: '15%',
        width: '55vw',
        height: '55vh',
        transform: 'translate3d(50%, -50%, 0)',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, rgba(168, 85, 247, 0.03) 55%, transparent 75%)',
        borderRadius: '50%',
        animation: 'purpleOrbPulse 11s ease-in-out infinite alternate',
        willChange: 'transform, opacity',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <style>{`
        @keyframes cyanOrbPulse {
          0% { opacity: 0.5; transform: translate3d(-50%, -50%, 0) scale(0.95); }
          100% { opacity: 0.95; transform: translate3d(-50%, -50%, 0) scale(1.15); }
        }
        @keyframes purpleOrbPulse {
          0% { opacity: 0.45; transform: translate3d(50%, -50%, 0) scale(0.9); }
          100% { opacity: 0.9; transform: translate3d(50%, -50%, 0) scale(1.2); }
        }
      `}</style>

      {/* Interactive Silk 2D Canvas Particle Field */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      />
    </div>
  );
}
