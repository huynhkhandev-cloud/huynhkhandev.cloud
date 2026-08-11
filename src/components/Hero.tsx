"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const frameworks = [
  {
    name: "Next.js",
    color: "#000000",
    bgColor: "#ffffff",
    link: "https://nextjs.org",
    desc: "React Framework",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Spring Boot",
    color: "#6DB33F",
    bgColor: "#ffffff",
    link: "https://spring.io/projects/spring-boot",
    desc: "Java Framework",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/springboot/springboot-original.svg",
  },
  {
    name: "Node.js",
    color: "#339933",
    bgColor: "#ffffff",
    link: "https://nodejs.org",
    desc: "JavaScript Runtime",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "PostgreSQL",
    color: "#336791",
    bgColor: "#ffffff",
    link: "https://postgresql.org",
    desc: "Database",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Docker",
    color: "#2496ED",
    bgColor: "#ffffff",
    link: "https://docker.com",
    desc: "Container Platform",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  },
  {
    name: "Kubernetes",
    color: "#326CE5",
    bgColor: "#ffffff",
    link: "https://kubernetes.io",
    desc: "Container Orchestration",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    bgColor: "#ffffff",
    link: "https://typescriptlang.org",
    desc: "Type Safety",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  {
    name: "Python",
    color: "#3776AB",
    bgColor: "#ffffff",
    link: "https://python.org",
    desc: "Backend Language",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    name: "MongoDB",
    color: "#47A248",
    bgColor: "#ffffff",
    link: "https://mongodb.com",
    desc: "NoSQL Database",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "AWS",
    color: "#FF9900",
    bgColor: "#ffffff",
    link: "https://aws.amazon.com",
    desc: "Cloud Platform",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg",
  },
  {
    name: "Redis",
    color: "#DC382D",
    bgColor: "#ffffff",
    link: "https://redis.io",
    desc: "In-Memory Cache",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  },
  {
    name: "GraphQL",
    color: "#E10098",
    bgColor: "#ffffff",
    link: "https://graphql.org",
    desc: "API Query Language",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-original.svg",
  },
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

function IconLogo({ iconUrl, color, size = 80 }: { iconUrl: string; color: string; size?: number }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${color}15, ${color}05)`,
      border: `2px solid ${color}40`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(8px)",
      boxShadow: `0 8px 32px ${color}20`,
    }}>
      <img
        src={iconUrl}
        alt=""
        style={{
          width: size * 0.6,
          height: size * 0.6,
          objectFit: "contain",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

function LogoPlanet({ framework, position, onHover, onLeave }: {
  framework: typeof frameworks[0];
  position: [number, number, number];
  onHover: () => void;
  onLeave: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const scale = hovered ? 1.15 : 1;

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover();
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
    >
      <Html center transform distanceFactor={5}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          transition: "all 0.3s ease",
        }}>
          <IconLogo iconUrl={framework.iconUrl} color={framework.color} size={75} />
          <span style={{
            fontSize: "11px",
            fontWeight: 700,
            color: framework.color,
            background: "rgba(0,0,0,0.85)",
            padding: "5px 14px",
            borderRadius: "20px",
            backdropFilter: "blur(12px)",
            whiteSpace: "nowrap",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(-8px)",
            transition: "all 0.3s ease",
            border: `1px solid ${framework.color}30`,
            letterSpacing: "0.5px",
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
  const { camera } = useThree();

  const positions = useMemo<[number, number, number][]>(() => {
    const result: [number, number, number][] = [];
    const cols = 4;
    const spacingX = 5;
    const spacingY = 4;

    frameworks.forEach((_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = (col - (cols - 1) / 2) * spacingX;
      const y = ((cols - 1) / 2 - row) * spacingY;
      result.push([x, y, 0]);
    });

    return result;
  }, []);

  useFrame(() => {
    camera.position.y = Math.sin(Date.now() * 0.0003) * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[0, 5, 10]} intensity={0.9} color="#ffffff" />
      <pointLight position={[-8, -3, 5]} intensity={0.4} color="#aaccff" />
      <Stars />

      {frameworks.map((fw, i) => (
        <LogoPlanet
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

export default function Hero() {
  const { t } = useI18n();
  const [hoveredFramework, setHoveredFramework] = useState<typeof frameworks[0] | null>(null);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
          <Scene
            onFrameworkHover={setHoveredFramework}
            onFrameworkLeave={() => setHoveredFramework(null)}
          />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, var(--background) 100%)" }} />

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

      {/* Framework Info Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hoveredFramework ? 1 : 0, y: hoveredFramework ? 0 : 20 }}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      >
        {hoveredFramework && (
          <div className="px-6 py-4 rounded-2xl backdrop-blur-xl border border-white/15 shadow-2xl bg-background/85 flex items-center gap-4">
            <IconLogo iconUrl={hoveredFramework.iconUrl} color={hoveredFramework.color} size={56} />
            <div>
              <p className="font-bold text-foreground text-lg">{hoveredFramework.name}</p>
              <p className="text-sm text-foreground-muted">{hoveredFramework.desc}</p>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
