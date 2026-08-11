"use client";

import React, { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, ExternalLink, ZoomIn, ZoomOut, Move } from "lucide-react";
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
  const { camera, gl } = useThree();

  const iconUrl = `https://icon.horse/icon/${new URL(framework.link).hostname}`;

  const [isDragging, setIsDragging] = useState(false);
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

  useFrame(() => {
    if (isDragging && groupRef.current) {
      groupRef.current.position.x = currentPos.current.x;
      groupRef.current.position.y = currentPos.current.y;
    }
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
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
  }, [isDragging, camera, gl]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handlePointerUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handlePointerUp);
    };
  }, [handleMouseMove]);

  return (
    <group ref={groupRef} position={position}>
      <Html center transform={false} zIndexRange={[10, 0]}>
        <div
          onMouseDown={handlePointerDown}
          onMouseEnter={() => {
            setHovered(true);
            onHover();
            if (!isDragging) document.body.style.cursor = "grab";
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
            <img src={iconUrl} alt={framework.name} draggable={false} style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }} />
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

function CameraController({ isPanning, setIsPanning }: { isPanning: boolean; setIsPanning: (v: boolean) => void }) {
  const { camera, gl } = useThree();
  const [dragging, setDragging] = useState(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const panOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.PointerEvent) => {
    if (!isPanning) return;
    setDragging(true);
    lastMouse.current = { x: e.clientX, y: e.clientY };
    document.body.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    setDragging(false);
    document.body.style.cursor = isPanning ? "grab" : "auto";
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging || !isPanning) return;
    
    const deltaX = (e.clientX - lastMouse.current.x) * 0.01;
    const deltaY = (e.clientY - lastMouse.current.y) * 0.01;
    
    panOffset.current.x -= deltaX;
    panOffset.current.y += deltaY;
    
    camera.position.x = panOffset.current.x;
    camera.position.y = panOffset.current.y;
    
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }, [dragging, isPanning, camera]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    if (isPanning) {
      document.body.style.cursor = "grab";
    } else {
      document.body.style.cursor = "auto";
    }
  }, [isPanning]);

  return (
    <Html fullscreen zIndexRange={[0, -1]} onPointerDown={handleMouseDown}>
      <div style={{ width: '100vw', height: '100vh' }} />
    </Html>
  );
}

function ZoomController({ zoom, setZoom }: { zoom: number; setZoom: (v: number) => void }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 15 / zoom;
  }, [zoom, camera]);

  return null;
}

function Scene({ onFrameworkHover, onFrameworkLeave, isPanning, setIsPanning, zoom, setZoom }: {
  onFrameworkHover: (fw: typeof frameworks[0] | null) => void;
  onFrameworkLeave: () => void;
  isPanning: boolean;
  setIsPanning: (v: boolean) => void;
  zoom: number;
  setZoom: (v: number) => void;
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
      <CameraController isPanning={isPanning} setIsPanning={setIsPanning} />
      <ZoomController zoom={zoom} setZoom={setZoom} />

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
          <img src={`https://icon.horse/icon/${new URL(framework.link).hostname}`} alt={framework.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div className="pr-4">
          <p className="font-bold text-foreground text-lg">{framework.name}</p>
          <p className="text-sm text-foreground-muted">{framework.desc}</p>
        </div>
        <a href={framework.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white font-medium rounded-xl hover:opacity-90 transition-all text-sm">
          <ExternalLink size={16} />
          Truy cập
        </a>
      </div>
    </motion.div>
  );
}

function ZoomControls({ zoom, setZoom, isPanning, setIsPanning }: { zoom: number; setZoom: (v: number) => void; isPanning: boolean; setIsPanning: (v: boolean) => void }) {
  return (
    <div className="absolute top-6 right-6 flex flex-col gap-2 z-30">
      <button
        onClick={() => setZoom(Math.min(zoom * 1.3, 3))}
        className="w-10 h-10 rounded-xl backdrop-blur-xl bg-background/50 border border-white/15 flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-white/25 transition-all"
        title="Phóng to"
      >
        <ZoomIn size={18} />
      </button>
      <button
        onClick={() => setZoom(Math.max(zoom / 1.3, 0.5))}
        className="w-10 h-10 rounded-xl backdrop-blur-xl bg-background/50 border border-white/15 flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-white/25 transition-all"
        title="Thu nhỏ"
      >
        <ZoomOut size={18} />
      </button>
      <button
        onClick={() => setIsPanning(!isPanning)}
        className={`w-10 h-10 rounded-xl backdrop-blur-xl bg-background/50 border flex items-center justify-center transition-all ${isPanning ? "border-accent-primary text-accent-primary" : "border-white/15 text-foreground-muted hover:text-foreground hover:border-white/25"}`}
        title="Di chuyển canvas"
      >
        <Move size={18} />
      </button>
    </div>
  );
}

export default function Hero() {
  const { t } = useI18n();
  const [hoveredFramework, setHoveredFramework] = useState<typeof frameworks[0] | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 55 }}>
          <Scene
            onFrameworkHover={setHoveredFramework}
            onFrameworkLeave={() => setHoveredFramework(null)}
            isPanning={isPanning}
            setIsPanning={setIsPanning}
            zoom={zoom}
            setZoom={setZoom}
          />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 50%, var(--background) 100%)" }} />

      {/* Zoom Controls */}
      <ZoomControls zoom={zoom} setZoom={setZoom} isPanning={isPanning} setIsPanning={setIsPanning} />

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

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center gap-4 z-20"
      >
        <a href="#projects" className="group px-8 py-4 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-all duration-300 flex items-center gap-2">
          Xem Dự án
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
        <a href="#contact" className="px-8 py-4 border border-border text-foreground-muted font-medium rounded-xl hover:text-foreground hover:border-accent-primary transition-all duration-300">
          Liên hệ ngay
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-foreground-muted">
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>

      {/* Framework Info Panel */}
      <FrameworkInfoPanel framework={hoveredFramework} />
    </section>
  );
}
