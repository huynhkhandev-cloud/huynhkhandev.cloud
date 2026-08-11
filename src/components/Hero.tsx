"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const frameworks = [
  { name: "Next.js", color: "#000000", borderColor: "#ffffff", link: "https://nextjs.org", radius: 10, speed: 0.1, size: 1.2, desc: "React Framework", icon: "next" },
  { name: "Node.js", color: "#339933", borderColor: "#ffffff", link: "https://nodejs.org", radius: 14, speed: 0.08, size: 1.1, desc: "JavaScript Runtime", icon: "node" },
  { name: "PostgreSQL", color: "#336791", borderColor: "#ffffff", link: "https://postgresql.org", radius: 18, speed: 0.06, size: 1.3, desc: "Database", icon: "postgres" },
  { name: "Redis", color: "#DC382D", borderColor: "#ffffff", link: "https://redis.io", radius: 22, speed: 0.05, size: 1.0, desc: "In-Memory Cache", icon: "redis" },
  { name: "Docker", color: "#2496ED", borderColor: "#ffffff", link: "https://docker.com", radius: 26, speed: 0.04, size: 1.3, desc: "Container Platform", icon: "docker" },
  { name: "AWS", color: "#FF9900", borderColor: "#ffffff", link: "https://aws.amazon.com", radius: 30, speed: 0.035, size: 1.2, desc: "Cloud Platform", icon: "aws" },
  { name: "TypeScript", color: "#3178C6", borderColor: "#ffffff", link: "https://typescriptlang.org", radius: 34, speed: 0.03, size: 1.1, desc: "Type Safety", icon: "typescript" },
  { name: "Python", color: "#3776AB", borderColor: "#FFD43B", link: "https://python.org", radius: 38, speed: 0.025, size: 1.2, desc: "Backend Language", icon: "python" },
  { name: "MongoDB", color: "#47A248", borderColor: "#ffffff", link: "https://mongodb.com", radius: 42, speed: 0.022, size: 1.1, desc: "NoSQL Database", icon: "mongodb" },
  { name: "GraphQL", color: "#E10098", borderColor: "#ffffff", link: "https://graphql.org", radius: 46, speed: 0.018, size: 1.0, desc: "API Query Language", icon: "graphql" },
];

function FrameworkLogo({ icon, color, size = 60 }: { icon: string; color: string; size?: number }) {
  const strokeColor = "#ffffff";
  const bgOpacity = 0.95;

  const logos: Record<string, React.ReactNode> = {
    next: (
      <svg viewBox="0 0 48 48" width={size} height={size}>
        <circle cx="24" cy="24" r="22" fill={color} opacity={bgOpacity} stroke={strokeColor} strokeWidth="1" />
        <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="20" fill="white">N</text>
      </svg>
    ),
    node: (
      <svg viewBox="0 0 48 48" width={size} height={size}>
        <circle cx="24" cy="24" r="22" fill={color} opacity={bgOpacity} stroke={strokeColor} strokeWidth="1" />
        <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="14" fill="white">JS</text>
      </svg>
    ),
    postgres: (
      <svg viewBox="0 0 48 48" width={size} height={size}>
        <circle cx="24" cy="24" r="22" fill={color} opacity={bgOpacity} stroke={strokeColor} strokeWidth="1" />
        <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="14" fill="white">PG</text>
      </svg>
    ),
    redis: (
      <svg viewBox="0 0 48 48" width={size} height={size}>
        <circle cx="24" cy="24" r="22" fill={color} opacity={bgOpacity} stroke={strokeColor} strokeWidth="1" />
        <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="20" fill="white">R</text>
      </svg>
    ),
    docker: (
      <svg viewBox="0 0 48 48" width={size} height={size}>
        <circle cx="24" cy="24" r="22" fill={color} opacity={bgOpacity} stroke={strokeColor} strokeWidth="1" />
        <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="20" fill="white">D</text>
      </svg>
    ),
    aws: (
      <svg viewBox="0 0 48 48" width={size} height={size}>
        <circle cx="24" cy="24" r="22" fill={color} opacity={bgOpacity} stroke={strokeColor} strokeWidth="1" />
        <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="11" fill="white">AWS</text>
      </svg>
    ),
    typescript: (
      <svg viewBox="0 0 48 48" width={size} height={size}>
        <circle cx="24" cy="24" r="22" fill={color} opacity={bgOpacity} stroke={strokeColor} strokeWidth="1" />
        <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="13" fill="white">TS</text>
      </svg>
    ),
    python: (
      <svg viewBox="0 0 48 48" width={size} height={size}>
        <circle cx="24" cy="24" r="22" fill={color} opacity={bgOpacity} stroke={strokeColor} strokeWidth="1" />
        <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="13" fill="#FFD43B">PY</text>
      </svg>
    ),
    mongodb: (
      <svg viewBox="0 0 48 48" width={size} height={size}>
        <circle cx="24" cy="24" r="22" fill={color} opacity={bgOpacity} stroke={strokeColor} strokeWidth="1" />
        <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="14" fill="white">M</text>
      </svg>
    ),
    graphql: (
      <svg viewBox="0 0 48 48" width={size} height={size}>
        <circle cx="24" cy="24" r="22" fill={color} opacity={bgOpacity} stroke={strokeColor} strokeWidth="1" />
        <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="13" fill="white">GQL</text>
      </svg>
    ),
  };

  return logos[icon] || logos.next;
}

function Stars() {
  const points = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const radius = 50 + Math.random() * 80;
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
      <pointsMaterial size={0.15} color="#ffffff" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function Planet({ framework, onHover, onLeave }: {
  framework: typeof frameworks[0];
  onHover: (fw: typeof framework | null) => void;
  onLeave: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      const t = time * framework.speed * 60;
      groupRef.current.position.x = Math.cos(t) * framework.radius;
      groupRef.current.position.z = Math.sin(t) * framework.radius;
      groupRef.current.position.y = Math.sin(t * 0.5) * 2;
    }
  });

  const scale = hovered ? 1.5 : 1;

  return (
    <group ref={groupRef}>
      <Html
        center
        transform
        scale={framework.size * scale * 0.5}
        distanceFactor={8}
        onPointerOver={(e: any) => {
          e.stopPropagation();
          setHovered(true);
          onHover(framework);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          onLeave();
          document.body.style.cursor = "auto";
        }}
        onClick={(e: any) => {
          e.stopPropagation();
          window.open(framework.link, "_blank");
        }}
        style={{
          pointerEvents: "auto",
          filter: hovered ? `drop-shadow(0 0 20px ${framework.color})` : "none",
          transition: "filter 0.3s",
        }}
      >
        <FrameworkLogo icon={framework.icon} color={framework.color} size={50} />
      </Html>
    </group>
  );
}

function SolarSystem({ onHover, onLeave }: {
  onHover: (fw: typeof frameworks[0] | null) => void;
  onLeave: () => void;
}) {
  return (
    <group>
      {/* Orbital paths */}
      {frameworks.map((fw) => (
        <mesh key={`orbit-${fw.name}`} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[fw.radius, 0.03, 16, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
        </mesh>
      ))}

      {/* Planets */}
      {frameworks.map((fw) => (
        <Planet
          key={fw.name}
          framework={fw}
          onHover={onHover}
          onLeave={onLeave}
        />
      ))}
    </group>
  );
}

function Scene({ onHover, onLeave }: {
  onHover: (fw: typeof frameworks[0] | null) => void;
  onLeave: () => void;
}) {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.y = Math.sin(Date.now() * 0.0003) * 1 + 3;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
      <Stars />
      <SolarSystem onHover={onHover} onLeave={onLeave} />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
        minDistance={15}
        maxDistance={60}
      />
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
        <Canvas camera={{ position: [0, 5, 35], fov: 60 }}>
          <Scene
            onHover={setHoveredFramework}
            onLeave={() => setHoveredFramework(null)}
          />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />
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
                style={{ background: `${hoveredFramework.color}20`, border: `1px solid ${hoveredFramework.color}40` }}
              >
                <FrameworkLogo icon={hoveredFramework.icon} color={hoveredFramework.color} size={40} />
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
