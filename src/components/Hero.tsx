"use client";

import React, { useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
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

function LogoItem({ framework, position, onHover, onLeave }: {
  framework: typeof frameworks[0];
  position: [number, number, number];
  onHover: () => void;
  onLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera, gl } = useThree();

  const iconUrl = `https://icon.horse/icon/${new URL(framework.link).hostname}`;

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setDragging(true);
    document.body.style.cursor = "grabbing";
  };

  const handlePointerUp = () => {
    setDragging(false);
    document.body.style.cursor = "auto";
  };

  const handlePointerMove = (e: any) => {
    if (dragging && meshRef.current) {
      e.stopPropagation();
      // Convert screen movement to world space
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      const vector = new THREE.Vector3(x, y, 0.5).unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      meshRef.current.position.x = pos.x;
      meshRef.current.position.y = pos.y;
    }
  };

  return (
    <>
      <mesh ref={meshRef} position={position} visible={false}>
        <planeGeometry args={[0.001, 0.001]} />
      </mesh>
      <Html
        position={position}
        center
        transform={false}
        zIndexRange={[10, 0]}
      >
        <div
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onMouseMove={handlePointerMove}
          onMouseEnter={() => {
            if (!dragging) {
              setHovered(true);
              onHover();
              document.body.style.cursor = "grab";
            }
          }}
          onMouseLeave={() => {
            setHovered(false);
            onLeave();
            document.body.style.cursor = "auto";
          }}
          onClick={() => {
            if (!dragging) {
              window.open(framework.link, "_blank");
            }
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            transition: dragging ? "none" : "all 0.3s ease",
            transform: hovered ? "scale(1.15)" : "scale(1)",
            userSelect: "none",
            cursor: dragging ? "grabbing" : "grab",
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
            transition: dragging ? "none" : "all 0.3s ease",
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
    </>
  );
}

function Scene({ onFrameworkHover, onFrameworkLeave }: {
  onFrameworkHover: (fw: typeof frameworks[0] | null) => void;
  onFrameworkLeave: () => void;
}) {
  const positions = useMemo<[number, number, number][]>(() => {
    // Random scatter across full screen
    const result: [number, number, number][] = [];
    const usedPositions: [number, number][] = [];

    const minDistance = 4;

    frameworks.forEach(() => {
      let attempts = 0;
      let pos: [number, number] = [0, 0];
      while (attempts < 100) {
        // Random position in world units (camera at z=15, fov=50)
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

function FrameworkIcon({ framework }: { framework: typeof frameworks[0] }) {
  const iconUrl = `https://icon.horse/icon/${new URL(framework.link).hostname}`;
  return (
    <div style={{
      width: 56,
      height: 56,
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
        src={iconUrl}
        alt={framework.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
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
          className="text-xl md:text-3xl lg:text-4xl font-semibold text-foreground-muted mb-6"
        >
          {t("hero.roles.backend")}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-12"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
        >
          <a
            href="#projects"
            className="group px-8 py-4 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-all duration-300 flex items-center gap-2"
          >
            {t("hero.viewProjects")}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-border text-foreground-muted font-medium rounded-xl hover:text-foreground hover:border-accent-primary transition-all duration-300"
          >
            {t("hero.contactMe")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-foreground-muted"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </div>

      {/* Framework Info Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hoveredFramework ? 1 : 0, y: hoveredFramework ? 0 : 20 }}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      >
        {hoveredFramework && (
          <div className="px-6 py-4 rounded-2xl backdrop-blur-xl border border-white/15 shadow-2xl bg-background/85 flex items-center gap-4">
            <FrameworkIcon framework={hoveredFramework} />
            <div>
              <p className="font-bold text-foreground text-lg">{hoveredFramework.name}</p>
              <p className="text-sm text-foreground-muted">{hoveredFramework.desc}</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Hint */}
      <div className="absolute top-24 right-6 text-xs text-foreground-muted/60 pointer-events-none">
        <p>💡 Kéo thả logo để sắp xếp</p>
      </div>
    </section>
  );
}
