"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const frameworks = [
  { name: "Next.js", icon: "N", color: "#ffffff", link: "https://nextjs.org", radius: 6, speed: 0.15, size: 0.8, desc: "React Framework" },
  { name: "Node.js", icon: "JS", color: "#68A063", link: "https://nodejs.org", radius: 8, speed: 0.12, size: 0.9, desc: "JavaScript Runtime" },
  { name: "PostgreSQL", icon: "PG", color: "#336791", link: "https://postgresql.org", radius: 10, speed: 0.1, size: 1.0, desc: "Database" },
  { name: "Redis", icon: "R", color: "#DC382D", link: "https://redis.io", radius: 7, speed: 0.18, size: 0.6, desc: "In-Memory Cache" },
  { name: "Docker", icon: "D", color: "#2496ED", link: "https://docker.com", radius: 12, speed: 0.08, size: 1.1, desc: "Container Platform" },
  { name: "AWS", icon: "AWS", color: "#FF9900", link: "https://aws.amazon.com", radius: 9, speed: 0.14, size: 0.85, desc: "Cloud Platform" },
  { name: "TypeScript", icon: "TS", color: "#3178C6", link: "https://typescriptlang.org", radius: 11, speed: 0.09, size: 0.95, desc: "Type Safety" },
  { name: "Python", icon: "PY", color: "#3776AB", link: "https://python.org", radius: 5, speed: 0.2, size: 0.7, desc: "Backend Language" },
];

function Stars() {
  const points = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const radius = 30 + Math.random() * 50;
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
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Planet({ framework, onHover, onLeave }: {
  framework: typeof frameworks[0];
  onHover: (fw: typeof framework | null) => void;
  onLeave: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.position.x = Math.cos(time * framework.speed) * framework.radius;
      groupRef.current.position.z = Math.sin(time * framework.speed) * framework.radius;
      groupRef.current.position.y = Math.sin(time * framework.speed * 2) * 0.5;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
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
        onClick={(e) => {
          e.stopPropagation();
          window.open(framework.link, "_blank");
        }}
      >
        <sphereGeometry args={[framework.size, 32, 32]} />
        <meshStandardMaterial
          color={framework.color}
          emissive={framework.color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Glow effect */}
      <mesh scale={hovered ? 1.3 : 1.15}>
        <sphereGeometry args={[framework.size, 32, 32]} />
        <meshBasicMaterial
          color={framework.color}
          transparent
          opacity={hovered ? 0.15 : 0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Ring for some planets */}
      {framework.name === "AWS" && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[framework.size * 1.5, 0.05, 16, 100]} />
          <meshBasicMaterial color={framework.color} transparent opacity={0.4} />
        </mesh>
      )}

      {/* Label */}
      <Html
        center
        distanceFactor={15}
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      >
        <div className="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap backdrop-blur-md"
          style={{
            background: "rgba(0,0,0,0.8)",
            color: framework.color,
            border: `1px solid ${framework.color}40`,
          }}
        >
          {framework.name}
        </div>
      </Html>
    </group>
  );
}

function SolarSystem({ onHover, onLeave }: {
  onHover: (fw: typeof frameworks[0] | null) => void;
  onLeave: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sun */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.8}
          roughness={0}
          metalness={0}
        />
      </mesh>

      {/* Sun glow */}
      <mesh scale={1.5}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Orbital paths */}
      {frameworks.map((fw) => (
        <mesh key={`orbit-${fw.name}`} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[fw.radius, 0.02, 16, 100]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
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
    camera.position.y = Math.sin(Date.now() * 0.0003) * 0.5 + 2;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
      <Stars />
      <SolarSystem onHover={onHover} onLeave={onLeave} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
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
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 3, 18], fov: 50 }}>
          <Scene
            onHover={setHoveredFramework}
            onLeave={() => setHoveredFramework(null)}
          />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 text-foreground"
        >
          {t("hero.title")}
        </motion.h1>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-3xl lg:text-4xl font-semibold text-foreground-muted mb-6"
        >
          {t("hero.roles.backend")}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-12"
        >
          {t("hero.tagline")}
        </motion.p>

        {/* CTAs */}
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

        {/* Scroll Indicator */}
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
          <div className="px-6 py-4 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm"
                style={{
                  background: `${hoveredFramework.color}20`,
                  border: `1px solid ${hoveredFramework.color}40`,
                  color: hoveredFramework.color,
                }}
              >
                {hoveredFramework.icon}
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
