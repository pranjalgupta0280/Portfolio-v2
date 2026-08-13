import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const TEXTUREMAP = 'https://i.postimg.cc/XYwvXN8D/img-4.png';
const DEPTHMAP = 'https://i.postimg.cc/2SHKQh2q/raw-4.webp';

// Custom Futuristic WebGL Shader Material
const FuturisticShaderMaterial = {
  uniforms: {
    uTexture: { value: null },
    uDepth: { value: null },
    uPointer: { value: new THREE.Vector2(0, 0) },
    uTime: { value: 0 },
    uScanProgress: { value: 0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform sampler2D uDepth;
    uniform vec2 uPointer;
    uniform float uTime;
    uniform float uScanProgress;
    varying vec2 vUv;

    void main() {
      vec4 depth = texture2D(uDepth, vUv);
      vec2 distortion = vUv + depth.r * uPointer * 0.03;
      vec4 texColor = texture2D(uTexture, distortion);

      // Scanning Red Laser Line Effect
      float scanY = uScanProgress;
      float distToScan = abs(vUv.y - scanY);
      float scanLine = smoothstep(0.04, 0.0, distToScan);
      vec3 laserColor = vec3(0.0, 0.96, 0.83) * scanLine * 1.8; // Neon Cyan Laser

      // Matrix Grid Glow
      vec2 gridUv = fract(vUv * 80.0) - 0.5;
      float dotGrid = smoothstep(0.48, 0.45, length(gridUv)) * depth.r * 0.4;
      vec3 cyanDot = vec3(0.0, 0.96, 0.83) * dotGrid;

      vec3 finalColor = texColor.rgb + laserColor + cyanDot;
      gl_FragColor = vec4(finalColor, texColor.a * 0.85);
    }
  `
};

function Scene() {
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
    }
  });

  return (
    <mesh ref={meshRef} scale={[7, 7, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
}

export default function FuturisticBackground() {
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
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <React.Suspense fallback={null}>
          <Scene />
        </React.Suspense>
      </Canvas>
      {/* Subtle Dark Radial Gradient Mask */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(7, 9, 14, 0.3) 0%, rgba(7, 9, 14, 0.85) 100%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
