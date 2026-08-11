"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Database,
  Cloud,
  Server,
  GitBranch,
  Shield,
  Activity,
  Layers,
  BarChart3,
  Briefcase,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { experience } from "@/lib/content";
import { useI18n } from "@/contexts/I18nContext";

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database size={20} />,
  Cloud: <Cloud size={20} />,
  Server: <Server size={20} />,
  GitBranch: <GitBranch size={20} />,
  Shield: <Shield size={20} />,
  Activity: <Activity size={20} />,
  Layers: <Layers size={20} />,
  BarChart3: <BarChart3 size={20} />,
};

function SectionWrapper({ children, id }: { children: React.ReactNode; id: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      id={id}
      className="min-h-screen flex items-center py-20 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </section>
  );
}

export default function Experience() {
  const { t } = useI18n();
  const exp = experience[0]; // Single experience

  return (
    <SectionWrapper id="experience">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t("experience.title")}
          </h2>
          <div className="w-20 h-1 bg-foreground rounded-full" />
        </motion.div>

        {/* Main Experience Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Company Badge */}
          <div className="absolute -top-4 left-6 px-4 py-1.5 bg-accent-primary text-white text-sm font-semibold rounded-full shadow-lg z-10">
            {exp.company}
          </div>

          {/* Card */}
          <div className="bg-background-secondary rounded-2xl border border-border p-8 pt-10 hover:border-foreground/20 transition-all duration-300">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-border">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{exp.role}</h3>
                <div className="flex items-center gap-2 text-foreground-muted">
                  <Calendar size={16} />
                  <span>{exp.period}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {exp.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs bg-background-accent rounded-full text-foreground-muted font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {exp.technologies.length > 4 && (
                  <span className="px-3 py-1.5 text-xs bg-accent-primary/10 text-accent-primary rounded-full font-medium">
                    +{exp.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {exp.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-background rounded-xl border border-border/50 hover:border-accent-primary/30 hover:bg-accent-primary/5 transition-all duration-300"
                >
                  <div className="p-2 bg-accent-primary/10 rounded-lg text-accent-primary mt-0.5">
                    <ArrowRight size={16} />
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed">{highlight}</p>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack Bar */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-foreground-muted uppercase tracking-wider mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    className="px-3 py-1.5 text-sm bg-background rounded-lg border border-border text-foreground hover:border-accent-primary hover:text-accent-primary transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
