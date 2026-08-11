"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check, Copy } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";

const socialLinks = [
  {
    name: "GitHub",
    icon: <GithubIcon size={24} />,
    url: "https://github.com/huynhkhandev-cloud",
    color: "hover:text-white",
  },
  {
    name: "LinkedIn",
    icon: <LinkedinIcon size={24} />,
    url: "https://linkedin.com/in/khanhhuynh",
    color: "hover:text-blue-400",
  },
  {
    name: "Email",
    icon: <Mail size={24} />,
    url: "mailto:kh@example.com",
    color: "hover:text-accent-primary",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText("kh@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-background-secondary/50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full mx-auto mb-6" />
          <p className="text-foreground-muted max-w-xl mx-auto">
            I&apos;m currently open to new opportunities and collaborations.
            Whether you have a question or just want to say hi, I&apos;ll try my
            best to get back to you!
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 md:p-12 bg-background-secondary rounded-2xl border border-border"
        >
          {/* Email */}
          <div className="mb-8">
            <p className="text-sm text-foreground-muted mb-2">Email me at</p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="mailto:kh@example.com"
                className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent"
              >
                kh@example.com
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-2 text-foreground-muted hover:text-accent-primary transition-colors"
                title="Copy email"
              >
                {copied ? (
                  <Check size={20} className="text-success" />
                ) : (
                  <Copy size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-foreground-muted text-sm">or find me on</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 text-foreground-muted ${link.color} transition-all duration-300 hover:bg-background-accent rounded-xl border border-border hover:border-accent-primary/30`}
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="mailto:kh@example.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-background font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            <Send size={18} />
            Send Message
          </motion.a>
        </motion.div>

        {/* Toast Notification */}
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-success text-background rounded-lg text-sm font-medium"
          >
            Email copied to clipboard!
          </motion.div>
        )}
      </div>
    </section>
  );
}
