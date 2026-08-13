import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const TEXTUREMAP = 'https://i.postimg.cc/XYwvXN8D/img-4.png';
const DEPTHMAP = 'https://i.postimg.cc/2SHKQh2q/raw-4.webp';

// Optimized Reddish Crimson Futuristic WebGL Shader Material
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
      // Smooth structural wave distortion
      pos.z += sin(uv.x * 8.0 + uScroll * 0.008) * 0.2;
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
      
      // Dynamic displacement
      vec2 scrollOffset = vec2(sin(uScroll * 0.0015) * 0.04, cos(uScroll * 0.0015) * 0.04);
      vec2 distortion = vUv + (depth.r * uPointer * 0.035) + (depth.r * scrollOffset);
      
      vec4 texColor = texture2D(uTexture, distortion);

      // Scanning Crimson Laser Line
      float scanY = uScanProgress;
      float distToScan = abs(vUv.y - scanY);
      float scanLine = smoothstep(0.04, 0.0, distToScan);
      vec3 laserColor = vec3(1.0, 0.08, 0.25) * scanLine * 2.2;

      // Matrix Dot Grid
      vec2 gridUv = fract(vUv * 60.0) - 0.5;
      float dotGrid = smoothstep(0.48, 0.45, length(gridUv)) * depth.r * 0.45;
      vec3 redDot = vec3(1.0, 0.15, 0.3) * dotGrid;

      // Warm Reddish Tint
      vec3 redTint = vec3(1.25, 0.75, 0.85);
      vec3 finalColor = (texColor.rgb * redTint) + laserColor + redDot;
      
      gl_FragColor = vec4(finalColor, texColor.a * 0.88);
    }
  `
};

function Scene({ scrollYRef }) {
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
      const currentScroll = scrollYRef.current || 0;

      meshRef.current.material.uniforms.uTime.value = time;
      meshRef.current.material.uniforms.uScanProgress.value = (Math.sin(time * 0.5) * 0.5 + 0.5);
      meshRef.current.material.uniforms.uPointer.value.lerp(pointer, 0.05);
      meshRef.current.material.uniforms.uScroll.value = currentScroll;

      // Smooth 60FPS lerped 3D rotation & morphing without React re-render lag
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        currentScroll * 0.0003,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        pointer.x * 0.12 + Math.sin(currentScroll * 0.001) * 0.08,
        0.05
      );
      meshRef.current.position.z = Math.sin(currentScroll * 0.0015) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} scale={[7, 7, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
}

export default function FuturisticBackground() {
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
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
      {/* Hardware-Accelerated Crimson Aura Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '75vw',
        height: '75vh',
        transform: 'translate3d(-50%, -50%, 0)',
        background: 'radial-gradient(circle, rgba(255, 0, 68, 0.22) 0%, rgba(168, 85, 247, 0.14) 50%, transparent 75%)',
        filter: 'blur(50px)',
        borderRadius: '50%',
        animation: 'crimsonAuraPulse 7s ease-in-out infinite alternate',
        pointerEvents: 'none',
        willChange: 'transform, opacity',
        zIndex: 0
      }} />

      <style>{`
        @keyframes crimsonAuraPulse {
          0% {
            opacity: 0.6;
            transform: translate3d(-50%, -50%, 0) scale(0.95);
          }
          100% {
            opacity: 0.9;
            transform: translate3d(-50%, -50%, 0) scale(1.1);
          }
        }
      `}</style>

      {/* WebGL 3D Canvas with DPR Cap for buttery smooth FPS */}
      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
        >
          <React.Suspense fallback={null}>
            <Scene scrollYRef={scrollYRef} />
          </React.Suspense>
        </Canvas>
      </div>

      {/* Dark Radial Vignette Overlay */}
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
