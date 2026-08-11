"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const frameworks = [
  { name: "Next.js", color: "#ffffff", link: "https://nextjs.org", size: 1.4, desc: "React Framework", icon: "N" },
  { name: "Node.js", color: "#339933", link: "https://nodejs.org", size: 1.3, desc: "JavaScript Runtime", icon: "JS" },
  { name: "PostgreSQL", color: "#336791", link: "https://postgresql.org", size: 1.5, desc: "Database", icon: "PG" },
  { name: "Redis", color: "#DC382D", link: "https://redis.io", size: 1.2, desc: "In-Memory Cache", icon: "R" },
  { name: "Docker", color: "#2496ED", link: "https://docker.com", size: 1.5, desc: "Container Platform", icon: "D" },
  { name: "AWS", color: "#FF9900", link: "https://aws.amazon.com", size: 1.4, desc: "Cloud Platform", icon: "AWS" },
  { name: "TypeScript", color: "#3178C6", link: "https://typescriptlang.org", size: 1.3, desc: "Type Safety", icon: "TS" },
  { name: "Python", color: "#3776AB", link: "https://python.org", size: 1.4, desc: "Backend Language", icon: "PY" },
  { name: "MongoDB", color: "#47A248", link: "https://mongodb.com", size: 1.3, desc: "NoSQL Database", icon: "M" },
  { name: "GraphQL", color: "#E10098", link: "https://graphql.org", size: 1.2, desc: "API Query Language", icon: "GQL" },
  { name: "Kubernetes", color: "#326CE5", link: "https://kubernetes.io", size: 1.3, desc: "Container Orchestration", icon: "K8" },
  { name: "Go", color: "#00ADD8", link: "https://go.dev", size: 1.2, desc: "Backend Language", icon: "GO" },
];

function Stars() {
  const points = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const radius = 50 + Math.random() * 60;
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
      <pointsMaterial size={0.12} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Planet({ framework, position, onHover, onLeave, isHovered }: {
  framework: typeof frameworks[0];
  position: [number, number, number];
  onHover: (fw: typeof framework | null) => void;
  onLeave: () => void;
  isHovered: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(framework);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          onLeave();
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          window.open(framework.link, "_blank");
        }}
        scale={hovered ? 1.3 : 1}
      >
        <sphereGeometry args={[framework.size * 0.5, 32, 32]} />
        <meshStandardMaterial
          color={framework.color}
          emissive={framework.color}
          emissiveIntensity={hovered ? 0.6 : 0.2}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glow */}
      <mesh scale={hovered ? 1.4 : 1.2}>
        <sphereGeometry args={[framework.size * 0.5, 32, 32]} />
        <meshBasicMaterial
          color={framework.color}
          transparent
          opacity={hovered ? 0.2 : 0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Label */}
      <Html
        center
        position={[0, framework.size * 0.5 + 0.5, 0]}
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <div className="px-2 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap backdrop-blur-md bg-black/70 border border-white/20"
          style={{ color: framework.color }}
        >
          {framework.icon}
        </div>
      </Html>
    </group>
  );
}

function Scene({ onHover, onLeave, hoveredId }: {
  onHover: (fw: typeof frameworks[0] | null) => void;
  onLeave: () => void;
  hoveredId: string | null;
}) {
  const { camera } = useThree();

  const positions = useMemo<[number, number, number][]>(() => {
    const result: [number, number, number][] = [];
    const cols = 4;
    const spacingX = 8;
    const spacingY = 5;

    frameworks.forEach((_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = (col - (cols - 1) / 2) * spacingX + (Math.random() - 0.5) * 2;
      const y = ((cols - 1) / 2 - row) * spacingY + (Math.random() - 0.5) * 1.5;
      result.push([x, y, 0]);
    });

    return result;
  }, []);

  useFrame(() => {
    camera.position.y = Math.sin(Date.now() * 0.0002) * 0.3 + 2;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -5, 5]} intensity={0.5} color="#8888ff" />
      <Stars />

      {frameworks.map((fw, i) => (
        <Planet
          key={fw.name}
          framework={fw}
          position={positions[i]}
          onHover={onHover}
          onLeave={onLeave}
          isHovered={hoveredId === fw.name}
        />
      ))}
    </>
  );
}

function FrameworkLogo({ icon, color, size = 40 }: { icon: string; color: string; size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <circle cx="24" cy="24" r="22" fill={color} opacity={0.9} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <text x="24" y="30" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="14" fill="white">{icon}</text>
    </svg>
  );
}

export default function Hero() {
  const { t } = useI18n();
  const [hoveredFramework, setHoveredFramework] = useState<typeof frameworks[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleHover = (fw: typeof frameworks[0] | null) => {
    setHoveredFramework(fw);
    setHoveredId(fw?.name || null);
  };

  const handleLeave = () => {
    setHoveredFramework(null);
    setHoveredId(null);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 18], fov: 55 }}>
          <Scene
            onHover={handleHover}
            onLeave={handleLeave}
            hoveredId={hoveredId}
          />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 30%, var(--background) 100%)" }} />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
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

      {/* Framework Info Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hoveredFramework ? 1 : 0, y: hoveredFramework ? 0 : 20 }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      >
        {hoveredFramework && (
          <div className="px-6 py-4 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl bg-background/80">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center"
                style={{ background: `${hoveredFramework.color}15`, border: `1px solid ${hoveredFramework.color}40` }}
              >
                <FrameworkLogo icon={hoveredFramework.icon} color={hoveredFramework.color} size={44} />
              </div>
              <div>
                <p className="font-semibold text-foreground">{hoveredFramework.name}</p>
                <p className="text-sm text-foreground-muted">{hoveredFramework.desc}</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
