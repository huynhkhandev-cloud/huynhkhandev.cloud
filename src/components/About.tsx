"use client";

import { motion } from "framer-motion";
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
import { skills, aboutText } from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server size={20} />,
  Monitor: <Monitor size={20} />,
  Database: <Database size={20} />,
  BarChart3: <BarChart3 size={20} />,
  Cloud: <Cloud size={20} />,
};

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-foreground-muted leading-relaxed whitespace-pre-line">
              {aboutText}
            </p>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-background-secondary rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-accent-primary/10 rounded-lg text-accent-primary">
                    <Code2 size={20} />
                  </div>
                  <span className="text-sm text-foreground-muted">
                    Backend Focus
                  </span>
                </div>
              </div>
              <div className="p-4 bg-background-secondary rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-accent-secondary/10 rounded-lg text-accent-secondary">
                    <Layers size={20} />
                  </div>
                  <span className="text-sm text-foreground-muted">
                    Full Stack
                  </span>
                </div>
              </div>
              <div className="p-4 bg-background-secondary rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-success/10 rounded-lg text-success">
                    <BarChart3 size={20} />
                  </div>
                  <span className="text-sm text-foreground-muted">
                    Data Driven
                  </span>
                </div>
              </div>
              <div className="p-4 bg-background-secondary rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-accent-primary/10 rounded-lg text-accent-primary">
                    <Terminal size={20} />
                  </div>
                  <span className="text-sm text-foreground-muted">
                    Automation
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid gap-4"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="p-5 bg-background-secondary rounded-xl border border-border hover:border-accent-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-lg text-accent-primary">
                    {iconMap[skill.icon] || <Server size={20} />}
                  </div>
                  <h3 className="font-semibold">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-sm bg-background-accent rounded-full text-foreground-muted hover:text-accent-primary transition-colors"
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
    </section>
  );
}
