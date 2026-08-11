"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail, Sun, Moon, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";
import { useTheme } from "@/contexts/ThemeContext";
import { useI18n, Locale } from "@/contexts/I18nContext";

const navLinks = [
  { href: "#about", key: "nav.about" },
  { href: "#projects", key: "nav.projects" },
  { href: "#experience", key: "nav.experience" },
  { href: "#contact", key: "nav.contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.slice(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale = () => {
    setLocale(locale === "vi" ? "en" : "vi");
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            className="text-xl font-bold text-foreground"
          >
            KH
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-accent-primary ${
                    activeSection === link.href.slice(1)
                      ? "text-accent-primary"
                      : "text-foreground-muted"
                  }`}
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors border border-border rounded-lg hover:border-accent-primary/30"
              title={locale === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
            >
              <Globe size={16} />
              <span className="uppercase font-medium">{locale}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-foreground-muted hover:text-foreground transition-colors border border-border rounded-lg hover:border-accent-primary/30"
              title={theme === "dark" ? t("theme.light") : t("theme.dark")}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Social Links */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com/huynhkhandev-cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-muted hover:text-accent-primary transition-colors"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href="https://linkedin.com/in/khanhhuynh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-muted hover:text-accent-primary transition-colors"
              >
                <LinkedinIcon size={20} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground-muted hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-12">
                <span className="text-xl font-bold text-foreground">KH</span>
                <button
                  className="text-foreground-muted hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <ul className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="text-2xl font-medium text-foreground-muted hover:text-accent-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(link.key)}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto">
                {/* Mobile Controls */}
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={toggleLocale}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors border border-border rounded-lg"
                  >
                    <Globe size={16} />
                    <span className="uppercase font-medium">{locale}</span>
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="p-2 text-foreground-muted hover:text-foreground transition-colors border border-border rounded-lg"
                  >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div>

                <div className="flex items-center gap-6">
                  <a
                    href="https://github.com/huynhkhandev-cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-muted hover:text-accent-primary transition-colors"
                  >
                    <GithubIcon size={24} />
                  </a>
                  <a
                    href="https://linkedin.com/in/khanhhuynh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-muted hover:text-accent-primary transition-colors"
                  >
                    <LinkedinIcon size={24} />
                  </a>
                  <a
                    href="mailto:kh@example.com"
                    className="text-foreground-muted hover:text-accent-primary transition-colors"
                  >
                    <Mail size={24} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
