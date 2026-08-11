"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, ExternalLink } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const frameworks = [
  { name: "Next.js", link: "https://nextjs.org", desc: "React Framework" },
  { name: "Spring Boot", link: "https://spring.io/projects/spring-boot", desc: "Java Framework" },
  { name: "Node.js", link: "https://nodejs.org", desc: "JavaScript Runtime" },
  { name: "PostgreSQL", link: "https://postgresql.org", desc: "Database" },
  { name: "Docker", link: "https://docker.com", desc: "Container Platform" },
  { name: "Kubernetes", link: "https://kubernetes.io", desc: "Container Orchestration" },
  { name: "TypeScript", link: "https://typescriptlang.org", desc: "Type Safety" },
  { name: "Python", link: "https://python.org", desc: "Backend Language" },
  { name: "MongoDB", link: "https://mongodb.com", desc: "NoSQL Database" },
  { name: "AWS", link: "https://aws.amazon.com", desc: "Cloud Platform" },
  { name: "Redis", link: "https://redis.io", desc: "In-Memory Cache" },
  { name: "GraphQL", link: "https://graphql.org", desc: "API Query Language" },
];

function Stars() {
  const points = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      const radius = 30 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#ffffff" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

interface LogoItemProps {
  framework: typeof frameworks[0];
  position: [number, number, number];
  onHover: () => void;
  onLeave: () => void;
}

function LogoItem({ framework, position, onHover, onLeave }: LogoItemProps) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const iconUrl = `https://icon.horse/icon/${new URL(framework.link).hostname}`;

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: position[0], y: position[1] });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    document.body.style.cursor = "grabbing";
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    document.body.style.cursor = "auto";
  };

  // Use useFrame to update position while dragging
  useFrame(() => {
    if (isDragging && groupRef.current) {
      groupRef.current.position.x = currentPos.current.x;
      groupRef.current.position.y = currentPos.current.y;
    }
  });

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && groupRef.current) {
      const rect = gl.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      
      currentPos.current.x = pos.x;
      currentPos.current.y = pos.y;
    }
  };

  // Add event listeners to window
  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handlePointerUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handlePointerUp);
    };
  }, []);

  const { gl } = useThree();

  return (
    <group
      ref={groupRef}
      position={position}
    >
      <Html
        center
        transform={false}
        zIndexRange={[10, 0]}
      >
        <div
          onMouseDown={handlePointerDown}
          onMouseEnter={() => {
            setHovered(true);
            onHover();
            document.body.style.cursor = "grab";
          }}
          onMouseLeave={() => {
            setHovered(false);
            onLeave();
            document.body.style.cursor = "auto";
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            transform: hovered && !isDragging ? "scale(1.15)" : "scale(1)",
            userSelect: "none",
            cursor: isDragging ? "grabbing" : "grab",
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
        >
          <div style={{
            width: 70,
            height: 70,
            borderRadius: "16px",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${hovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.2)",
            overflow: "hidden",
            padding: "12px",
            transition: "all 0.3s ease",
          }}>
            <img
              src={iconUrl}
              alt={framework.name}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                pointerEvents: "none",
              }}
            />
          </div>
          <span style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#ffffff",
            background: "rgba(0,0,0,0.8)",
            padding: "5px 14px",
            borderRadius: "20px",
            backdropFilter: "blur(12px)",
            whiteSpace: "nowrap",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(-8px)",
            transition: "all 0.3s ease",
            border: "1px solid rgba(255,255,255,0.1)",
            letterSpacing: "0.3px",
            pointerEvents: "none",
          }}>
            {framework.name}
          </span>
        </div>
      </Html>
    </group>
  );
}

function Scene({ onFrameworkHover, onFrameworkLeave }: {
  onFrameworkHover: (fw: typeof frameworks[0] | null) => void;
  onFrameworkLeave: () => void;
}) {
  const positions = useMemo<[number, number, number][]>(() => {
    const result: [number, number, number][] = [];
    const usedPositions: [number, number][] = [];
    const minDistance = 4;

    frameworks.forEach(() => {
      let attempts = 0;
      let pos: [number, number] = [0, 0];
      while (attempts < 100) {
        const x = (Math.random() - 0.5) * 24;
        const y = (Math.random() - 0.5) * 14;
        const tooClose = usedPositions.some(
          ([ux, uy]) => Math.sqrt((ux - x) ** 2 + (uy - y) ** 2) < minDistance
        );
        if (!tooClose) {
          pos = [x, y];
          break;
        }
        attempts++;
      }
      usedPositions.push(pos);
      result.push([pos[0], pos[1], 0]);
    });

    return result;
  }, []);

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 5, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-8, -3, 5]} intensity={0.5} color="#aaccff" />
      <Stars />

      {frameworks.map((fw, i) => (
        <LogoItem
          key={fw.name}
          framework={fw}
          position={positions[i]}
          onHover={() => onFrameworkHover(fw)}
          onLeave={onFrameworkLeave}
        />
      ))}
    </>
  );
}

function FrameworkInfoPanel({ framework }: { framework: typeof frameworks[0] | null }) {
  if (!framework) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="px-6 py-5 rounded-2xl backdrop-blur-xl border border-white/15 shadow-2xl bg-background/85 flex items-center gap-5">
        <div style={{
          width: 60,
          height: 60,
          borderRadius: "14px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "10px",
        }}>
          <img
            src={`https://icon.horse/icon/${new URL(framework.link).hostname}`}
            alt={framework.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div className="pr-4">
          <p className="font-bold text-foreground text-lg">{framework.name}</p>
          <p className="text-sm text-foreground-muted">{framework.desc}</p>
        </div>
        <a
          href={framework.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white font-medium rounded-xl hover:opacity-90 transition-all text-sm"
        >
          <ExternalLink size={16} />
          Truy cập
        </a>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const { t } = useI18n();
  const [hoveredFramework, setHoveredFramework] = useState<typeof frameworks[0] | null>(null);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 55 }}>
          <Scene
            onFrameworkHover={setHoveredFramework}
            onFrameworkLeave={() => setHoveredFramework(null)}
          />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 50%, var(--background) 100%)" }} />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 text-foreground"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-3xl lg:text-4xl font-semibold text-foreground-muted mb-8"
        >
          {t("hero.roles.fullstack")}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto"
        >
          {t("hero.tagline")}
        </motion.p>
      </div>

      {/* CTA Buttons - Bottom of section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center gap-4 z-20"
      >
        <a
          href="#projects"
          className="group px-8 py-4 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-all duration-300 flex items-center gap-2"
        >
          Xem Dự án
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href="#contact"
          className="px-8 py-4 border border-border text-foreground-muted font-medium rounded-xl hover:text-foreground hover:border-accent-primary transition-all duration-300"
        >
          Liên hệ ngay
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-foreground-muted"
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>

      {/* Framework Info Panel */}
      <FrameworkInfoPanel framework={hoveredFramework} />

      {/* Hint */}
      <div className="absolute top-24 right-6 text-xs text-foreground-muted/60 pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 bg-accent-primary rounded-full animate-pulse" />
        Kéo thả logo để sắp xếp
      </div>
    </section>
  );
}
