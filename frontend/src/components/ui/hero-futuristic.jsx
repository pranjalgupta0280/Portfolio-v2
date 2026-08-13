import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const TEXTUREMAP = 'https://i.postimg.cc/XYwvXN8D/img-4.png';
const DEPTHMAP = 'https://i.postimg.cc/2SHKQh2q/raw-4.webp';

// Custom Futuristic WebGL Shader Material (Reddish Crimson Theme + Scroll Displacement)
const FuturisticShaderMaterial = {
  uniforms: {
    uTexture: { value: null },
    uDepth: { value: null },
    uPointer: { value: new THREE.Vector2(0, 0) },
    uTime: { value: 0 },
    uScanProgress: { value: 0 },
    uScroll: { value: 0 }
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uScroll;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      // Scroll structural wave morphing
      pos.z += sin(uv.x * 10.0 + uScroll * 0.01) * 0.25;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform sampler2D uDepth;
    uniform vec2 uPointer;
    uniform float uTime;
    uniform float uScanProgress;
    uniform float uScroll;
    varying vec2 vUv;

    void main() {
      vec4 depth = texture2D(uDepth, vUv);
      
      // Dynamic displacement driven by mouse pointer AND scroll speed
      vec2 scrollOffset = vec2(sin(uScroll * 0.002) * 0.05, cos(uScroll * 0.002) * 0.05);
      vec2 distortion = vUv + (depth.r * uPointer * 0.04) + (depth.r * scrollOffset);
      
      vec4 texColor = texture2D(uTexture, distortion);

      // Scanning Reddish Laser Beam Effect
      float scanY = uScanProgress;
      float distToScan = abs(vUv.y - scanY);
      float scanLine = smoothstep(0.045, 0.0, distToScan);
      vec3 laserColor = vec3(1.0, 0.08, 0.25) * scanLine * 2.5; // Neon Crimson Laser

      // Matrix Grid Glow (Reddish Ruby Dots)
      vec2 gridUv = fract(vUv * (70.0 + sin(uScroll * 0.001) * 15.0)) - 0.5;
      float dotGrid = smoothstep(0.48, 0.45, length(gridUv)) * depth.r * 0.5;
      vec3 redDot = vec3(1.0, 0.15, 0.3) * dotGrid;

      // Warm Crimson Aura Tint
      vec3 redTint = vec3(1.3, 0.7, 0.85);
      vec3 finalColor = (texColor.rgb * redTint) + laserColor + redDot;
      
      gl_FragColor = vec4(finalColor, texColor.a * 0.9);
    }
  `
};

function Scene({ scrollY }) {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP, DEPTHMAP]);
  const meshRef = useRef();

  const shaderMaterial = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(FuturisticShaderMaterial.uniforms),
      vertexShader: FuturisticShaderMaterial.vertexShader,
      fragmentShader: FuturisticShaderMaterial.fragmentShader,
      transparent: true
    });
    mat.uniforms.uTexture.value = rawMap;
    mat.uniforms.uDepth.value = depthMap;
    return mat;
  }, [rawMap, depthMap]);

  useFrame(({ clock, pointer }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      meshRef.current.material.uniforms.uTime.value = time;
      meshRef.current.material.uniforms.uScanProgress.value = (Math.sin(time * 0.6) * 0.5 + 0.5);
      meshRef.current.material.uniforms.uPointer.value.lerp(pointer, 0.05);
      meshRef.current.material.uniforms.uScroll.value = scrollY;

      // 3D Structural rotation morphing when scrolled over
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        scrollY * 0.0004,
        0.08
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        pointer.x * 0.15 + Math.sin(scrollY * 0.001) * 0.1,
        0.08
      );
      meshRef.current.position.z = Math.sin(scrollY * 0.002) * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} scale={[7.2, 7.2, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
}

export default function FuturisticBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      {/* Glowing Pulsing Crimson Aura Background Behind WebGL */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '80vw',
        height: '80vh',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(255, 0, 68, 0.28) 0%, rgba(168, 85, 247, 0.18) 45%, transparent 75%)',
        filter: 'blur(70px)',
        borderRadius: '50%',
        animation: 'crimsonAuraPulse 8s ease-in-out infinite alternate',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <style>{`
        @keyframes crimsonAuraPulse {
          0% {
            opacity: 0.55;
            transform: translate(-50%, -50%) scale(0.9);
            filter: blur(60px);
          }
          100% {
            opacity: 0.95;
            transform: translate(-50%, -50%) scale(1.15);
            filter: blur(90px);
          }
        }
      `}</style>

      {/* WebGL 3D Canvas */}
      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
        >
          <React.Suspense fallback={null}>
            <Scene scrollY={scrollY} />
          </React.Suspense>
        </Canvas>
      </div>

      {/* Dark Radial Edge Vignette Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(7, 9, 14, 0.1) 0%, rgba(7, 9, 14, 0.85) 100%)',
        pointerEvents: 'none',
        zIndex: 2
      }} />
    </div>
  );
}
