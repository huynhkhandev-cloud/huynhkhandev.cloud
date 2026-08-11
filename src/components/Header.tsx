"use client";

import { useState, useEffect, useRef } from "react";
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
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLUListElement>(null);
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

  useEffect(() => {
    if (navRef.current) {
      const activeIndex = navLinks.findIndex(
        (link) => link.href.slice(1) === activeSection
      );
      if (activeIndex >= 0) {
        const activeItem = navRef.current.children[activeIndex] as HTMLElement;
        if (activeItem) {
          setIndicatorStyle({
            left: activeItem.offsetLeft,
            width: activeItem.offsetWidth,
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
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-3 left-3 right-3 z-50"
      >
        <div className="liquid-glass relative">
          {/* Top shine for depth */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <nav className="px-5 py-3.5 flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="relative px-4 py-2.5 text-xl font-bold text-foreground transition-all duration-500"
            >
              <span className="relative z-10 tracking-tight">KH</span>
            </a>

            {/* Desktop Nav with Liquid Glass Blob */}
            <div className="relative hidden md:block">
              <ul ref={navRef} className="flex items-center gap-1 p-1.5 rounded-2xl">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={`relative px-5 py-2.5 text-base font-semibold rounded-xl transition-colors duration-300 ${
                          isActive
                            ? "text-foreground"
                            : "text-foreground/60 hover:text-foreground"
                        }`}
                      >
                        {t(link.key)}
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Liquid Glass Tab Indicator - Apple Vision Pro Style */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 rounded-2xl pointer-events-none"
                style={{
                  background: "var(--tab-active-bg)",
                  boxShadow: "var(--tab-active-shadow)",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                }}
                initial={false}
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  opacity: activeSection ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 22,
                  mass: 0.6,
                }}
              >
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                {/* Top shine line */}
                <div className="absolute inset-x-2 top-1 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={toggleLocale}
                className="group flex items-center gap-2 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-foreground/70 hover:text-foreground rounded-xl transition-all duration-300 hover:bg-white/10"
                title={locale === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
              >
                <Globe size={18} />
                <span className="min-w-[1.5rem]">{locale}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative p-2.5 text-foreground/70 hover:text-foreground rounded-xl transition-all duration-300 hover:bg-white/10"
                title={theme === "dark" ? t("theme.light") : t("theme.dark")}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Social Links */}
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

              {/* Mobile Menu Button */}
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xl md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="liquid-glass fixed inset-x-3 top-3 mx-auto max-w-4xl h-[calc(100vh-1.5rem)] rounded-3xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-12">
                  <span className="text-2xl font-bold text-foreground tracking-tight">KH</span>
                  <button
                    className="p-3 text-foreground/70 hover:text-foreground rounded-xl transition-all duration-300 hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X size={24} />
                  </button>
                </div>

                <ul className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <a
                        href={link.href}
                        className={`group flex items-center gap-4 p-4 text-2xl font-semibold rounded-2xl transition-all duration-300 ${
                          activeSection === link.href.slice(1)
                            ? "text-foreground bg-white/20"
                            : "text-foreground/60 hover:text-foreground hover:bg-white/10"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>{t(link.key)}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-auto space-y-6">
                  {/* Mobile Controls */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10">
                    <button
                      onClick={toggleLocale}
                      className="flex items-center gap-2.5 px-5 py-3 text-base font-bold uppercase tracking-wider text-foreground/80 hover:text-foreground rounded-xl transition-all duration-300 hover:bg-white/10"
                    >
                      <Globe size={20} />
                      <span>{locale}</span>
                    </button>
                    <button
                      onClick={toggleTheme}
                      className="p-3 text-foreground/80 hover:text-foreground rounded-xl transition-all duration-300 hover:bg-white/10"
                    >
                      {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href="https://github.com/huynhkhandev-cloud"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 text-foreground/70 hover:text-foreground rounded-2xl transition-all duration-300 hover:bg-white/10"
                    >
                      <GithubIcon size={28} />
                    </a>
                    <a
                      href="https://linkedin.com/in/khanhhuynh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 text-foreground/70 hover:text-foreground rounded-2xl transition-all duration-300 hover:bg-white/10"
                    >
                      <LinkedinIcon size={28} />
                    </a>
                    <a
                      href="mailto:kh@example.com"
                      className="p-4 text-foreground/70 hover:text-foreground rounded-2xl transition-all duration-300 hover:bg-white/10"
                    >
                      <Mail size={28} strokeWidth={1.75} />
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
