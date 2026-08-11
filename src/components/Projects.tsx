"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  Lock,
  CheckCircle2,
  Code2,
  Lightbulb,
  Zap,
} from "lucide-react";
import { GithubIcon } from "./ui/Icons";
import { projects, Project } from "@/lib/content";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-background-secondary rounded-2xl border border-border overflow-hidden hover:border-accent-primary/30 transition-all duration-300 group"
    >
      {/* Card Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold group-hover:text-accent-primary transition-colors">
              {project.title}
            </h3>
            {project.isPrivate ? (
              <span className="flex items-center gap-1 px-2 py-1 text-xs bg-background-accent rounded-full text-foreground-muted">
                <Lock size={12} />
                Private
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2 py-1 text-xs bg-success/10 rounded-full text-success">
                <CheckCircle2 size={12} />
                Public
              </span>
            )}
          </div>
          <p className="text-foreground-muted text-sm mb-4">{project.subtitle}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-background-accent rounded-md text-foreground-muted font-mono"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 text-xs bg-background-accent rounded-md text-foreground-muted">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-foreground-muted mt-2"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-border pt-6 space-y-6">
              {/* Description */}
              <div>
                <p className="text-foreground-muted leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Period */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-primary/10 rounded-full text-accent-primary text-sm">
                <Zap size={14} />
                {project.period}
              </div>

              {/* Highlights */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Code2 size={16} className="text-accent-primary" />
                  <h4 className="font-semibold">Key Features</h4>
                </div>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-foreground-muted"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 bg-accent-primary rounded-full flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges & Solutions */}
              {project.challenges && project.solutions && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-background-accent rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb size={16} className="text-foreground-muted" />
                      <h4 className="font-semibold text-sm">Challenges</h4>
                    </div>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, i) => (
                        <li
                          key={i}
                          className="text-sm text-foreground-muted flex items-start gap-2"
                        >
                          <span className="text-accent-secondary">•</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-background-accent rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2
                        size={16}
                        className="text-success"
                      />
                      <h4 className="font-semibold text-sm">Solutions</h4>
                    </div>
                    <ul className="space-y-2">
                      {project.solutions!.map((solution, i) => (
                        <li
                          key={i}
                          className="text-sm text-foreground-muted flex items-start gap-2"
                        >
                          <span className="text-success">✓</span>
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tech Stack Full */}
              <div>
                <h4 className="font-semibold mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm bg-background-accent rounded-lg text-foreground-muted font-mono border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-background-accent rounded-lg text-sm text-foreground-muted hover:text-accent-primary hover:border-accent-primary border border-border transition-all"
                  >
                    <GithubIcon size={16} />
                    View Source
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-lg text-sm text-background font-medium hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-background-secondary/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full" />
          <p className="mt-4 text-foreground-muted max-w-2xl">
            A selection of projects showcasing my expertise in backend development,
            data engineering, and automation.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
