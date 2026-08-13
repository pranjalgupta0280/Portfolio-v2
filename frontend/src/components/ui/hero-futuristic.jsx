import React, { useEffect, useRef } from 'react';

export default function FuturisticBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { powerPreference: 'high-performance', alpha: true, antialias: false });
    if (!gl) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse & Scroll Physics with Damped Inertia (Silk Smooth)
    const state = {
      targetMouseX: 0,
      targetMouseY: 0,
      mouseX: 0,
      mouseY: 0,
      targetScroll: 0,
      scroll: 0,
      time: 0
    };

    const handleMouseMove = (e) => {
      state.targetMouseX = (e.clientX / width) * 2 - 1;
      state.targetMouseY = -(e.clientY / height) * 2 + 1;
    };

    const handleScroll = () => {
      state.targetScroll = window.scrollY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      gl.viewport(0, 0, width, height);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Shaders: Pure Hardware Accelerated GLSL Shader
    const vsSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform vec2 uMouse;
      uniform float uScroll;
      uniform float uTime;
      uniform vec2 uResolution;

      // Fast SIMD Noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
      }

      void main() {
        vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
        
        // Scroll & Pointer Warp
        vec2 mouseOffset = uMouse * 0.08;
        float scrollEffect = uScroll * 0.0006;
        st += mouseOffset + vec2(sin(scrollEffect), cos(scrollEffect) * 0.5);

        // Crimson Futuristic Grid Wave
        vec2 gridSt = st * (18.0 + sin(scrollEffect * 2.0) * 3.0);
        vec2 gridCell = fract(gridSt) - 0.5;
        float dist = length(gridCell);
        
        float depth = noise(st * 4.0 + uTime * 0.2);
        float dotGlow = smoothstep(0.4, 0.35, dist) * depth;

        // Scanning Laser Line
        float scanY = sin(uTime * 1.2) * 0.8;
        float laserLine = smoothstep(0.03, 0.0, abs(st.y - scanY));

        // Reddish Crimson Color Palette
        vec3 crimsonBase = vec3(0.03, 0.04, 0.07); // Dark void
        vec3 redGlow = vec3(1.0, 0.08, 0.28) * dotGlow * 1.6;
        vec3 laserGlow = vec3(1.0, 0.15, 0.35) * laserLine * 2.2;
        vec3 purpleAura = vec3(0.6, 0.1, 0.8) * (1.0 - length(st)) * 0.25;

        vec3 finalColor = crimsonBase + redGlow + laserGlow + purpleAura;
        gl_FragColor = vec4(finalColor, 0.95);
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Full screen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1
    ]), gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uMouse = gl.getUniformLocation(program, 'uMouse');
    const uScroll = gl.getUniformLocation(program, 'uScroll');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uResolution = gl.getUniformLocation(program, 'uResolution');

    gl.viewport(0, 0, width, height);

    // Render Loop with Pure Silk Smooth Physics
    const render = () => {
      state.time += 0.016;

      // Exponential Damping Lerp for zero-lag 120FPS smoothness
      state.mouseX += (state.targetMouseX - state.mouseX) * 0.04;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.04;
      state.scroll += (state.targetScroll - state.scroll) * 0.04;

      gl.uniform2f(uMouse, state.mouseX, state.mouseY);
      gl.uniform1f(uScroll, state.scroll);
      gl.uniform1f(uTime, state.time);
      gl.uniform2f(uResolution, width, height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
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
      background: '#07090e'
    }}>
      {/* Silky Hardware-Accelerated Ambient Crimson Aura Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '85vw',
        height: '85vh',
        transform: 'translate3d(-50%, -50%, 0)',
        background: 'radial-gradient(circle, rgba(255, 0, 68, 0.25) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 75%)',
        borderRadius: '50%',
        animation: 'auraPulse 8s ease-in-out infinite alternate',
        willChange: 'opacity, transform',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <style>{`
        @keyframes auraPulse {
          0% { opacity: 0.5; transform: translate3d(-50%, -50%, 0) scale(0.95); }
          100% { opacity: 0.85; transform: translate3d(-50%, -50%, 0) scale(1.1); }
        }
      `}</style>

      {/* Pure Direct WebGL Canvas */}
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
