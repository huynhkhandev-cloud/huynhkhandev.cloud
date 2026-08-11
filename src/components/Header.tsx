"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail, Sun, Moon, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";
import { useTheme } from "@/contexts/ThemeContext";
import { useI18n } from "@/contexts/I18nContext";

const navLinks = [
  { href: "#about", key: "nav.about" },
  { href: "#projects", key: "nav.projects" },
  { href: "#experience", key: "nav.experience" },
  { href: "#contact", key: "nav.contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.slice(1));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      const idx = navLinks.findIndex((l) => l.href.slice(1) === activeSection);
      if (idx >= 0) {
        const items = navRef.current.querySelectorAll("[data-nav-item]");
        const item = items[idx] as HTMLElement;
        if (item) {
          const parentRect = navRef.current.getBoundingClientRect();
          const itemRect = item.getBoundingClientRect();
          setIndicator({
            left: itemRect.left - parentRect.left,
            width: itemRect.width,
          });
        }
      }
    }
  }, [activeSection]);

  const toggleLocale = () => {
    setLocale(locale === "vi" ? "en" : "vi");
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-3 left-3 right-3 z-50"
      >
        <div className="liquid-glass mx-auto max-w-4xl">
          {/* Top highlight */}
          <div className="absolute inset-x-1 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          <nav className="px-5 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="px-3 py-2 flex items-center">
              <img src="/logo.png" alt="KH Logo" className="h-9 w-9 object-contain" />
            </a>

            {/* Desktop Nav */}
            <div ref={navRef} className="relative hidden md:flex items-center">
              <div className="flex items-center gap-1 p-1.5 rounded-2xl">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    data-nav-item
                    className={`relative px-5 py-2.5 text-base font-medium rounded-xl transition-colors duration-300 ${
                      activeSection === link.href.slice(1)
                        ? "text-foreground z-10"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {t(link.key)}
                  </a>
                ))}
              </div>

              {/* Active Tab Indicator */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 h-[calc(100%-12px)] rounded-xl pointer-events-none"
                style={{
                  background: "var(--tab-indicator-bg, rgba(255,255,255,0.15))",
                  boxShadow: "var(--tab-indicator-shadow, 0 2px 8px rgba(0,0,0,0.1))",
                  border: "var(--tab-indicator-border, 1px solid rgba(255,255,255,0.2))",
                }}
                animate={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: activeSection ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 via-transparent to-transparent" />
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLocale}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-foreground/70 hover:text-foreground rounded-xl transition-all duration-300 hover:bg-white/10"
              >
                <Globe size={18} />
                <span>{locale}</span>
              </button>

              <button
                onClick={toggleTheme}
                className="p-2.5 text-foreground/70 hover:text-foreground rounded-xl transition-all duration-300 hover:bg-white/10"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              <div className="hidden md:flex items-center gap-1 pl-1">
                <a
                  href="https://github.com/huynhkhandev-cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-foreground/70 hover:text-foreground rounded-xl transition-all duration-300 hover:bg-white/10"
                >
                  <GithubIcon size={22} />
                </a>
                <a
                  href="https://linkedin.com/in/khanhhuynh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-foreground/70 hover:text-foreground rounded-xl transition-all duration-300 hover:bg-white/10"
                >
                  <LinkedinIcon size={22} />
                </a>
              </div>

              <button
                className="md:hidden p-2.5 text-foreground/70 hover:text-foreground rounded-xl transition-all duration-300 hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={22} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xl md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="liquid-glass fixed inset-x-3 top-3 mx-auto max-w-4xl h-[calc(100vh-1.5rem)] rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-10">
                  <img src="/logo.png" alt="KH Logo" className="h-10 w-10 object-contain" />
                  <button
                    className="p-3 text-foreground/70 hover:text-foreground rounded-xl transition-all hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`p-4 text-2xl font-medium rounded-2xl transition-all ${
                        activeSection === link.href.slice(1)
                          ? "text-foreground bg-white/15"
                          : "text-foreground/60 hover:text-foreground hover:bg-white/10"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(link.key)}
                    </motion.a>
                  ))}
                </div>

                <div className="mt-auto space-y-5">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10">
                    <button
                      onClick={toggleLocale}
                      className="flex items-center gap-2 px-4 py-2.5 text-base font-semibold uppercase tracking-wider text-foreground/80 hover:text-foreground rounded-xl transition-all hover:bg-white/10"
                    >
                      <Globe size={20} />
                      <span>{locale}</span>
                    </button>
                    <button
                      onClick={toggleTheme}
                      className="p-2.5 text-foreground/80 hover:text-foreground rounded-xl transition-all hover:bg-white/10"
                    >
                      {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <a href="https://github.com/huynhkhandev-cloud" target="_blank" rel="noopener noreferrer" className="p-3 text-foreground/70 hover:text-foreground rounded-xl transition-all hover:bg-white/10">
                      <GithubIcon size={26} />
                    </a>
                    <a href="https://linkedin.com/in/khanhhuynh" target="_blank" rel="noopener noreferrer" className="p-3 text-foreground/70 hover:text-foreground rounded-xl transition-all hover:bg-white/10">
                      <LinkedinIcon size={26} />
                    </a>
                    <a href="mailto:kh@example.com" className="p-3 text-foreground/70 hover:text-foreground rounded-xl transition-all hover:bg-white/10">
                      <Mail size={26} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
