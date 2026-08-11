"use client";

import { motion } from "framer-motion";
import {
  Database,
  Cloud,
  Server,
  GitBranch,
  Shield,
  Activity,
  Layers,
  BarChart3,
} from "lucide-react";
import { experience } from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database size={24} />,
  Cloud: <Cloud size={24} />,
  Server: <Server size={24} />,
  GitBranch: <GitBranch size={24} />,
  Shield: <Shield size={24} />,
  Activity: <Activity size={24} />,
  Layers: <Layers size={24} />,
  BarChart3: <BarChart3 size={24} />,
};

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent-primary rounded-full border-4 border-background md:-translate-x-1/2 -translate-y-1 z-10">
                <div className="absolute inset-0 bg-accent-primary rounded-full animate-ping opacity-50" />
              </div>

              {/* Content */}
              <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div className="p-6 bg-background-secondary rounded-2xl border border-border hover:border-accent-primary/30 transition-colors">
                  {/* Header */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs bg-accent-primary/10 text-accent-primary rounded-full mb-2">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                    <p className="text-foreground-muted">{exp.company}</p>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-3 mb-6">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-foreground-muted"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-background-accent rounded-full text-foreground-muted font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
