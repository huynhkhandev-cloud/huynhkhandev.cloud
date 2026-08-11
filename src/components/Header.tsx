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
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-3 left-3 right-3 z-50"
      >
        <div className="liquid-glass mx-auto max-w-4xl">
          <nav className="px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="relative px-3 py-2 text-lg font-bold text-foreground transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">KH</span>
              <motion.span
                className="absolute inset-0 bg-accent-primary/10 rounded-lg opacity-0 hover:opacity-100"
                transition={{ duration: 0.2 }}
              />
            </a>

            {/* Desktop Nav with Liquid Glass Blob */}
            <div className="relative hidden md:block">
              <ul ref={navRef} className="flex items-center gap-1 p-1 rounded-xl">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                          isActive
                            ? "text-foreground"
                            : "text-foreground-muted hover:text-foreground"
                        }`}
                      >
                        {t(link.key)}
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Liquid Glass Blob Indicator */}
              <motion.div
                className="absolute bottom-0 h-[calc(100%-6px)] rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 backdrop-blur-md border border-accent-primary/20 shadow-lg"
                initial={false}
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  opacity: activeSection ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              >
                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent" />
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={toggleLocale}
                className="group relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium uppercase tracking-wider text-foreground-muted hover:text-foreground rounded-lg transition-all duration-200 hover:bg-accent-primary/5"
                title={locale === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
              >
                <Globe size={14} className="transition-transform duration-200 group-hover:rotate-12" />
                <span>{locale}</span>
                <motion.span
                  className="absolute inset-0 rounded-lg bg-accent-primary/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.2 }}
                />
              </button>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="group relative p-2 text-foreground-muted hover:text-foreground rounded-lg transition-all duration-200 hover:bg-accent-primary/5"
                title={theme === "dark" ? t("theme.light") : t("theme.dark")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  key={theme}
                  initial={{ scale: 0, rotate: -90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </motion.div>
              </motion.button>

              {/* Social Links */}
              <div className="hidden md:flex items-center gap-1 pl-1">
                <motion.a
                  href="https://github.com/huynhkhandev-cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 text-foreground-muted hover:text-foreground rounded-lg transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <GithubIcon size={18} />
                  <motion.span
                    className="absolute inset-0 rounded-lg bg-accent-primary/10 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/khanhhuynh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 text-foreground-muted hover:text-foreground rounded-lg transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <LinkedinIcon size={18} />
                  <motion.span
                    className="absolute inset-0 rounded-lg bg-accent-primary/10 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden relative p-2 text-foreground-muted hover:text-foreground rounded-lg hover:bg-accent-primary/5"
                onClick={() => setIsMobileMenuOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu size={20} />
              </motion.button>
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
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="liquid-glass fixed inset-x-3 top-3 mx-auto max-w-4xl h-[calc(100vh-1.5rem)] rounded-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full p-5">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-xl font-bold text-foreground">KH</span>
                  <motion.button
                    className="p-2 text-foreground-muted hover:text-foreground rounded-lg hover:bg-accent-primary/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={22} />
                  </motion.button>
                </div>

                <ul className="flex flex-col gap-3">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <a
                        href={link.href}
                        className={`group relative flex items-center gap-3 p-3 text-xl font-medium rounded-xl transition-all duration-200 ${
                          activeSection === link.href.slice(1)
                            ? "text-foreground bg-accent-primary/10"
                            : "text-foreground-muted hover:text-foreground hover:bg-accent-primary/5"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="flex-1">{t(link.key)}</span>
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-accent-primary opacity-0 group-hover:opacity-100 transition-opacity"
                          layoutId="mobile-indicator"
                        />
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-auto space-y-6">
                  {/* Mobile Controls */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-background-secondary/50">
                    <button
                      onClick={toggleLocale}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground-muted hover:text-foreground rounded-lg hover:bg-accent-primary/5 transition-colors"
                    >
                      <Globe size={16} />
                      <span className="uppercase">{locale}</span>
                    </button>
                    <motion.button
                      onClick={toggleTheme}
                      className="p-2 text-foreground-muted hover:text-foreground rounded-lg hover:bg-accent-primary/5 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </motion.button>
                  </div>

                  <div className="flex items-center gap-4">
                    <motion.a
                      href="https://github.com/huynhkhandev-cloud"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-foreground-muted hover:text-foreground rounded-xl hover:bg-accent-primary/5 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <GithubIcon size={24} />
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/khanhhuynh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-foreground-muted hover:text-foreground rounded-xl hover:bg-accent-primary/5 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <LinkedinIcon size={24} />
                    </motion.a>
                    <motion.a
                      href="mailto:kh@example.com"
                      className="p-3 text-foreground-muted hover:text-foreground rounded-xl hover:bg-accent-primary/5 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Mail size={24} />
                    </motion.a>
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
