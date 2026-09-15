import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WorldCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
}

export const WorldCanvas: React.FC<WorldCanvasProps> = ({ scrollProgress }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.035);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 16);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x10152b, 1.5);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0x8b5cf6, 4, 25);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 3, 25);
    cyanLight.position.set(4, 2, 2);
    scene.add(cyanLight);

    // 5. Ambient Deep Particle Universe (4,000 particles)
    const particleCount = 4000;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorViolet = new THREE.Color(0x8b5cf6);
    const colorCyan = new THREE.Color(0x06b6d4);
    const colorWhite = new THREE.Color(0xdbeafe);

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a spherical/toroidal cloud
      const r = 8 + Math.random() * 28;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mixFactor = Math.random();
      const chosenColor = mixFactor < 0.4 ? colorViolet : mixFactor < 0.8 ? colorCyan : colorWhite;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom Canvas Circular Point Texture
    const createCircleTexture = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 64;
      cvs.height = 64;
      const ctx = cvs.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(160, 210, 255, 0.8)');
        gradient.addColorStop(0.7, 'rgba(139, 92, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(cvs);
    };

    const particleTexture = createCircleTexture();

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      map: particleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Central Neural Core (Pulsing Singularity)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner glowing sphere
    const coreGeo = new THREE.IcosahedronGeometry(0.8, 3);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xc4b5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Concentric Cybernetic Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.02, 16, 64), ringMat1);
    coreGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.015, 16, 64), ringMat2);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    // 7. 3D Dynamic Neural Network (Nodes & Interconnecting Filaments)
    const nodeCount = 42;
    const nodePositions: THREE.Vector3[] = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const nodeSphereGeo = new THREE.SphereGeometry(0.08, 12, 12);

    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.2 + Math.random() * 4.5;
      const pos = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.7,
        r * Math.cos(phi)
      );
      nodePositions.push(pos);

      const nodeInstance = new THREE.Mesh(nodeSphereGeo, nodeMat);
      nodeInstance.position.copy(pos);
      nodeGroup.add(nodeInstance);
    }

    // Connect nodes that are close to each other
    const linePositions: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 2.4) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    nodeGroup.add(lines);

    // 8. Mouse Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // 9. Resize Handling
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // 10. Animation Loop & Camera Trajectory Lerp
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let currentCamPos = new THREE.Vector3(0, 0, 16);
    let currentCamLook = new THREE.Vector3(0, 0, 0);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const p = scrollRef.current; // 0.0 to 1.0

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Particle subtle rotation
      particles.rotation.y = elapsedTime * 0.03 + p * 0.5;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.08;

      // Neural Core Pulsing
      const scale = 1 + Math.sin(elapsedTime * 2.5) * 0.12;
      coreMesh.scale.set(scale, scale, scale);
      coreMesh.rotation.y += 0.008;
      coreMesh.rotation.x += 0.004;

      ring1.rotation.z += 0.006;
      ring2.rotation.y -= 0.005;

      // Dynamic Network Rotation & Expansion
      nodeGroup.rotation.y = elapsedTime * 0.04 + p * 0.8;
      nodeGroup.rotation.x = Math.cos(elapsedTime * 0.03) * 0.05;
      const networkSpread = 1 + p * 0.8;
      nodeGroup.scale.set(networkSpread, networkSpread, networkSpread);

      // Light pulsing
      coreLight.intensity = 3 + Math.sin(elapsedTime * 3) * 1.5;

      // Calculate Target Camera Coordinates based on the 6 Acts:
      // Act 1 (0.0 - 0.15): Void & Neural Awakening
      // Act 2 (0.15 - 0.32): Chinmay meets AI (focus on portrait node)
      // Act 3 (0.32 - 0.48): Chinmay A - Profile & Track record
      // Act 4 (0.48 - 0.75): Systems I Build showroom
      // Act 5 (0.75 - 0.90): How I Think (Isometric blueprint)
      // Act 6 (0.90 - 1.00): Core Transformation & Contact
      const targetPos = new THREE.Vector3();
      const targetLook = new THREE.Vector3();

      if (p < 0.18) {
        // Act 1
        const t = p / 0.18;
        targetPos.set(0, 0, 16 - t * 3);
        targetLook.set(0, 0, 0);
      } else if (p < 0.36) {
        // Act 2: Move right to highlight portrait node
        const t = (p - 0.18) / 0.18;
        targetPos.set(t * 3.5, t * 0.8, 13 - t * 3.5);
        targetLook.set(t * 1.5, t * 0.4, 0);
      } else if (p < 0.54) {
        // Act 3: Move left to track record terminal
        const t = (p - 0.36) / 0.18;
        targetPos.set(3.5 - t * 6.5, 0.8 - t * 1.4, 9.5 + t * 1.5);
        targetLook.set(1.5 - t * 2.8, 0.4 - t * 0.8, 0);
      } else if (p < 0.76) {
        // Act 4: Center down in front of Systems showroom
        const t = (p - 0.54) / 0.22;
        targetPos.set(-3.0 + t * 3.0, -0.6 - t * 1.5, 11 + t * 1.5);
        targetLook.set(-1.3 + t * 1.3, -0.4 - t * 0.8, 0);
      } else if (p < 0.90) {
        // Act 5: Rise high for isometric blueprint view
        const t = (p - 0.76) / 0.14;
        targetPos.set(0, -2.1 + t * 8.5, 12.5 - t * 3.5);
        targetLook.set(0, -1.2 + t * 1.2, 0);
      } else {
        // Act 6: Zoom into convergent singularity
        const t = (p - 0.90) / 0.10;
        targetPos.set(0, 6.4 - t * 6.4, 9.0 - t * 3.5);
        targetLook.set(0, 0, 0);
      }

      // Apply subtle mouse parallax
      targetPos.x += mouse.x * 0.8;
      targetPos.y += mouse.y * 0.6;

      // Smooth camera interpolation
      currentCamPos.lerp(targetPos, 0.06);
      currentCamLook.lerp(targetLook, 0.06);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentCamLook);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #090a16 0%, #050508 70%)' }}
    />
  );
};
