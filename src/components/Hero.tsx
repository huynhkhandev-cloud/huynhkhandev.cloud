"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const frameworks = [
  { name: "Next.js", icon: "N", color: "#ffffff", link: "https://nextjs.org", desc: "React Framework" },
  { name: "Node.js", icon: "JS", color: "#68A063", link: "https://nodejs.org", desc: "JavaScript Runtime" },
  { name: "PostgreSQL", icon: "PG", color: "#336791", link: "https://postgresql.org", desc: "Database" },
  { name: "Redis", icon: "R", color: "#DC382D", link: "https://redis.io", desc: "In-Memory Cache" },
  { name: "Docker", icon: "D", color: "#2496ED", link: "https://docker.com", desc: "Container Platform" },
  { name: "AWS", icon: "AWS", color: "#FF9900", link: "https://aws.amazon.com", desc: "Cloud Platform" },
  { name: "TypeScript", icon: "TS", color: "#3178C6", link: "https://typescriptlang.org", desc: "Type Safety" },
  { name: "Python", icon: "PY", color: "#3776AB", link: "https://python.org", desc: "Backend Language" },
  { name: "GraphQL", icon: "GQL", color: "#E10098", link: "https://graphql.org", desc: "API Query Language" },
  { name: "MongoDB", icon: "M", color: "#47A248", link: "https://mongodb.com", desc: "NoSQL Database" },
  { name: "Kubernetes", icon: "K8", color: "#326CE5", link: "https://kubernetes.io", desc: "Container Orchestration" },
  { name: "Go", icon: "GO", color: "#00ADD8", link: "https://go.dev", desc: "Backend Language" },
];

export default function Hero() {
  const { t } = useI18n();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const roles = [
    t("hero.roles.backend"),
    t("hero.roles.data"),
    t("hero.roles.bi"),
  ];

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedTitle.length < currentRole.length) {
          setDisplayedTitle(currentRole.slice(0, displayedTitle.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedTitle.length > 0) {
          setDisplayedTitle(displayedTitle.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayedTitle, isDeleting, currentRoleIndex, roles]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Framework Logos Background */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-framework-grid opacity-30" />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-accent-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-accent-secondary/5 to-transparent rounded-full blur-3xl" />

        {frameworks.map((fw, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const baseX = 8 + col * 24;
          const baseY = 12 + row * 30;
          const isHovered = hoveredIndex === i;

          return (
            <motion.a
              key={fw.name}
              href={fw.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute pointer-events-auto"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isHovered ? 0.9 : 0.08,
                scale: isHovered ? 1.2 : 1,
                x: baseX,
                y: baseY,
              }}
              whileHover={{ scale: 1.15, opacity: 0.5 }}
              transition={{
                opacity: { duration: 0.4 },
                scale: { duration: 0.3 },
                x: { duration: 0.6, delay: i * 0.05 },
                y: { duration: 0.6, delay: i * 0.05 },
              }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col items-center gap-2 group">
                <div
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${fw.color}22, ${fw.color}11)`,
                    border: `1px solid ${fw.color}33`,
                    boxShadow: isHovered ? `0 0 30px ${fw.color}40, inset 0 0 20px ${fw.color}20` : "none",
                  }}
                >
                  <span style={{ color: fw.color }}>{fw.icon}</span>

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none"
                    style={{
                      background: "var(--background)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                  >
                    {fw.desc}
                  </motion.div>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
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

        {/* Role with Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="h-12 md:h-16 flex items-center justify-center mb-6"
        >
          <span className="text-xl md:text-3xl lg:text-4xl font-semibold text-foreground-muted">
            {displayedTitle}
          </span>
          <span className="w-[3px] h-8 md:h-12 ml-1 bg-accent-primary animate-pulse" />
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
    </section>
  );
}
