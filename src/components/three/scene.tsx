"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const count = 600;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    if (!posAttr) return;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around
      if (arr[i * 3] > 12.5) arr[i * 3] = -12.5;
      if (arr[i * 3] < -12.5) arr[i * 3] = 12.5;
      if (arr[i * 3 + 1] > 7.5) arr[i * 3 + 1] = -7.5;
      if (arr[i * 3 + 1] < -7.5) arr[i * 3 + 1] = 7.5;
    }

    posAttr.needsUpdate = true;

    // React to mouse
    pointsRef.current.rotation.y +=
      (mouseRef.current.x * 0.05 - pointsRef.current.rotation.y) * 0.02;
    pointsRef.current.rotation.x +=
      (mouseRef.current.y * 0.03 - pointsRef.current.rotation.x) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#000000"
        size={0.08}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const pointCount = 120;

  const points = useMemo(() => {
    const p = new Float32Array(pointCount * 3);
    for (let i = 0; i < pointCount; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 12;
      p[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return p;
  }, []);

  const velocities = useMemo(() => {
    const v = new Float32Array(pointCount * 3);
    for (let i = 0; i < pointCount; i++) {
      v[i * 3] = (Math.random() - 0.5) * 0.008;
      v[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      v[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return v;
  }, []);

  const linePositions = useMemo(
    () => new Float32Array(pointCount * pointCount * 6),
    [],
  );

  useFrame(() => {
    if (!lineRef.current) return;

    // Move points
    for (let i = 0; i < pointCount; i++) {
      points[i * 3] += velocities[i * 3];
      points[i * 3 + 1] += velocities[i * 3 + 1];
      points[i * 3 + 2] += velocities[i * 3 + 2];

      if (Math.abs(points[i * 3]) > 10) velocities[i * 3] *= -1;
      if (Math.abs(points[i * 3 + 1]) > 6) velocities[i * 3 + 1] *= -1;
      if (Math.abs(points[i * 3 + 2]) > 4) velocities[i * 3 + 2] *= -1;
    }

    // Draw lines between close points
    let lineIndex = 0;
    const threshold = 4;
    for (let i = 0; i < pointCount; i++) {
      for (let j = i + 1; j < pointCount; j++) {
        const dx = points[i * 3] - points[j * 3];
        const dy = points[i * 3 + 1] - points[j * 3 + 1];
        const dz = points[i * 3 + 2] - points[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < threshold) {
          linePositions[lineIndex++] = points[i * 3];
          linePositions[lineIndex++] = points[i * 3 + 1];
          linePositions[lineIndex++] = points[i * 3 + 2];
          linePositions[lineIndex++] = points[j * 3];
          linePositions[lineIndex++] = points[j * 3 + 1];
          linePositions[lineIndex++] = points[j * 3 + 2];
        }
      }
    }

    // Fill remaining with zeros
    for (let i = lineIndex; i < linePositions.length; i++) {
      linePositions[i] = 0;
    }

    const geo = lineRef.current.geometry;
    const posAttr = geo.attributes.position;
    if (posAttr) {
      posAttr.needsUpdate = true;
    }
    geo.setDrawRange(0, lineIndex / 3);
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[linePositions, 3]}
          count={linePositions.length / 3}
          array={linePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#000000" transparent opacity={0.15} />
    </lineSegments>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ParticleField />
          <ConnectionLines />
        </Suspense>
      </Canvas>
    </div>
  );
}
