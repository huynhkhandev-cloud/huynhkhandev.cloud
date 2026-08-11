"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check, Copy } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";
import { useI18n } from "@/contexts/I18nContext";

const socialLinks = [
  {
    name: "GitHub",
    icon: <GithubIcon size={24} />,
    url: "https://github.com/huynhkhandev-cloud",
  },
  {
    name: "LinkedIn",
    icon: <LinkedinIcon size={24} />,
    url: "https://linkedin.com/in/khanhhuynh",
  },
  {
    name: "Email",
    icon: <Mail size={24} />,
    url: "mailto:kh@example.com",
  },
];

export default function Contact() {
  const { t } = useI18n();
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t("contact.title")}</h2>
          <div className="w-20 h-1 bg-foreground rounded-full mx-auto mb-6" />
          <p className="text-foreground-muted max-w-xl mx-auto">
            {t("contact.description")}
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
            <p className="text-sm text-foreground-muted mb-2">{t("contact.emailMe")}</p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="mailto:kh@example.com"
                className="text-xl md:text-2xl font-semibold text-foreground"
              >
                kh@example.com
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-2 text-foreground-muted hover:text-foreground transition-colors"
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
            <span className="text-foreground-muted text-sm">{t("contact.orFindMe")}</span>
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
                className="p-4 text-foreground-muted hover:text-foreground transition-all duration-300 hover:bg-background-accent rounded-xl border border-border hover:border-foreground/20"
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
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-foreground text-background font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            <Send size={18} />
            {t("contact.sendMessage")}
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
            {t("contact.emailCopied")}
          </motion.div>
        )}
      </div>
    </section>
  );
}
