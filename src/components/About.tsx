"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Server,
  Monitor,
  Database,
  BarChart3,
  Cloud,
  Code2,
  Terminal,
  Layers,
} from "lucide-react";
import { skills } from "@/lib/content";
import { useI18n } from "@/contexts/I18nContext";

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server size={20} />,
  Monitor: <Monitor size={20} />,
  Database: <Database size={20} />,
  BarChart3: <BarChart3 size={20} />,
  Cloud: <Cloud size={20} />,
};

const skillKeys: Record<string, string> = {
  "Backend": "about.skills.backend",
  "Frontend": "about.skills.frontend",
  "Database": "about.skills.database",
  "Data & BI": "about.skills.dataBI",
  "Cloud & DevOps": "about.skills.cloudDevOps",
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

export default function About() {
  const { t } = useI18n();

  return (
    <SectionWrapper id="about">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t("about.title")}</h2>
          <div className="w-20 h-1 bg-foreground rounded-full" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-foreground-muted leading-relaxed whitespace-pre-line">
              {t("about.bio")}
            </p>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-background-secondary rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-foreground/5 rounded-lg text-foreground">
                    <Code2 size={20} />
                  </div>
                  <span className="text-sm text-foreground-muted">
                    {t("about.stats.backend")}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-background-secondary rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-foreground/5 rounded-lg text-foreground">
                    <Layers size={20} />
                  </div>
                  <span className="text-sm text-foreground-muted">
                    {t("about.stats.fullstack")}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-background-secondary rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-foreground/5 rounded-lg text-foreground">
                    <BarChart3 size={20} />
                  </div>
                  <span className="text-sm text-foreground-muted">
                    {t("about.stats.dataDriven")}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-background-secondary rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-foreground/5 rounded-lg text-foreground">
                    <Terminal size={20} />
                  </div>
                  <span className="text-sm text-foreground-muted">
                    {t("about.stats.automation")}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid gap-4"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-5 bg-background-secondary rounded-xl border border-border hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-foreground/5 rounded-lg text-foreground">
                    {iconMap[skill.icon] || <Server size={20} />}
                  </div>
                  <h3 className="font-semibold text-foreground">{t(skillKeys[skill.category] || skill.category)}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-sm bg-background-accent rounded-full text-foreground-muted hover:text-foreground transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
