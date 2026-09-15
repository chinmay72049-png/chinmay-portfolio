import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ZarboVertexShader, ZarboFragmentShader } from './ZarboShader';

export type ZarboState = 'IDLE' | 'LISTENING' | 'PROCESSING' | 'RESPONDING';

interface ZarboCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  activeSectionId: string;
  state: ZarboState;
  audioLevel: number; // 0.0 to 1.0
}

export const ZarboCanvas: React.FC<ZarboCanvasProps> = ({
  scrollProgress,
  activeSectionId,
  state,
  audioLevel
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Store current props in refs for animation loop
  const stateRef = useRef(state);
  stateRef.current = state;

  const audioLevelRef = useRef(audioLevel);
  audioLevelRef.current = audioLevel;

  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  const sectionRef = useRef(activeSectionId);
  sectionRef.current = activeSectionId;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.5);

    // 3. Renderer with power optimization
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Construct Concentric Wavy Ring Particle Geometry (Inspired by 1527.jpg reference)
    const isMobile = window.innerWidth < 768;
    const ringCount = isMobile ? 70 : 130;
    const pointsPerRing = isMobile ? 110 : 190;
    const totalPoints = ringCount * pointsPerRing;

    const positions = new Float32Array(totalPoints * 3);
    const normals = new Float32Array(totalPoints * 3);
    const sizes = new Float32Array(totalPoints);
    const ringIndices = new Float32Array(totalPoints);

    let idx = 0;
    for (let r = 0; r < ringCount; r++) {
      const v = (r / (ringCount - 1)) * Math.PI; // 0 to PI
      const baseRadius = 1.95;

      for (let p = 0; p < pointsPerRing; p++) {
        const u = (p / pointsPerRing) * Math.PI * 2; // 0 to 2PI

        // Base sphere shell point
        const nx = Math.sin(v) * Math.cos(u);
        const ny = Math.cos(v);
        const nz = Math.sin(v) * Math.sin(u);

        // Folded undulating structure like in 1527.jpg
        const fold = Math.sin(u * 3.0) * 0.12 + Math.cos(v * 4.0) * 0.08;
        const rad = baseRadius + fold;

        positions[idx * 3] = nx * rad;
        positions[idx * 3 + 1] = ny * rad;
        positions[idx * 3 + 2] = nz * rad;

        normals[idx * 3] = nx;
        normals[idx * 3 + 1] = ny;
        normals[idx * 3 + 2] = nz;

        // Varied point sizes: finer at the poles, denser at the equator
        sizes[idx] = 0.05 + Math.random() * 0.04;
        ringIndices[idx] = r;

        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aNormal', new THREE.BufferAttribute(normals, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aRingIndex', new THREE.BufferAttribute(ringIndices, 1));

    // 5. Shader Material
    const uniforms = {
      uTime: { value: 0 },
      uAudioLevel: { value: 0 },
      uState: { value: 0 },
      uScrollFactor: { value: 0 }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: ZarboVertexShader,
      fragmentShader: ZarboFragmentShader,
      uniforms: uniforms,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false
    });

    const zarboMesh = new THREE.Points(geometry, material);
    scene.add(zarboMesh);

    // 6. Flaring Rim Floating Particles
    const rimCount = isMobile ? 600 : 1500;
    const rimGeo = new THREE.BufferGeometry();
    const rimPos = new Float32Array(rimCount * 3);
    for (let i = 0; i < rimCount; i++) {
      const radius = 2.1 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      rimPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      rimPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      rimPos[i * 3 + 2] = radius * Math.cos(phi);
    }
    rimGeo.setAttribute('position', new THREE.BufferAttribute(rimPos, 3));

    const rimMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x0284c7,
      transparent: true,
      opacity: 0.4,
      blending: THREE.NormalBlending,
      depthWrite: false
    });
    const rimMesh = new THREE.Points(rimGeo, rimMat);
    scene.add(rimMesh);

    // 7. Mouse Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 8. Resize Handler
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // 9. Animation Loop with Delta Time and Repositioning
    let animId: number;
    const clock = new THREE.Clock();
    let currentOrbPos = new THREE.Vector3(0, 0, 0);
    let currentAudio = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Update state numeric value
      let stateVal = 0;
      if (stateRef.current === 'LISTENING') stateVal = 1;
      else if (stateRef.current === 'PROCESSING') stateVal = 2;
      else if (stateRef.current === 'RESPONDING') stateVal = 3;

      // Smooth audio level
      currentAudio += (audioLevelRef.current - currentAudio) * 0.2;

      uniforms.uTime.value = elapsed;
      uniforms.uAudioLevel.value = currentAudio;
      uniforms.uState.value = stateVal;
      uniforms.uScrollFactor.value = scrollRef.current;

      // Rotate orb slowly with gentle tilting
      zarboMesh.rotation.y = elapsed * 0.12 + mouse.x * 0.3;
      zarboMesh.rotation.x = Math.sin(elapsed * 0.08) * 0.1 + mouse.y * 0.2;
      rimMesh.rotation.y = -elapsed * 0.06;

      // Section-based 3D Repositioning:
      // Hero (awakening): Center-stage
      // Content sections: Drift to right (so text on left reads easily)
      // Intelligence layer / Local: Drift to left
      // Connection: Center re-convergence
      const sec = sectionRef.current;
      const targetPos = new THREE.Vector3(0, 0, 0);

      if (window.innerWidth >= 1024) {
        if (sec === 'awakening') {
          targetPos.set(0, 0, 0);
        } else if (sec === 'engineer' || sec === 'voice-ai' || sec === 'projects') {
          targetPos.set(2.4, 0.1, -0.6); // Drift right
        } else if (sec === 'intelligence-layer' || sec === 'local-intelligence' || sec === 'automation') {
          targetPos.set(-2.3, -0.1, -0.6); // Drift left
        } else if (sec === 'experience' || sec === 'skills' || sec === 'education') {
          targetPos.set(2.2, 0.2, -0.5); // Drift right
        } else if (sec === 'connection') {
          targetPos.set(0, 0.2, 0.3); // Converge center
        }
      } else {
        // On mobile/tablet, keep gently centered slightly behind content
        targetPos.set(0, 0.2, -1.2);
      }

      currentOrbPos.lerp(targetPos, 0.04);
      zarboMesh.position.copy(currentOrbPos);
      rimMesh.position.copy(currentOrbPos);

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      rimGeo.dispose();
      rimMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 45%, #ffffff 0%, #f4f6f9 55%, #e8edf5 100%)'
      }}
      aria-hidden="true"
    />
  );
};
