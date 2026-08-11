"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useTheme } from "./ThemeContext";

export type Locale = "vi" | "en";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = {
  vi: {
    nav: {
      about: "Giới thiệu",
      projects: "Dự án",
      experience: "Kinh nghiệm",
      contact: "Liên hệ",
    },
    hero: {
      title: "Huỳnh Văn Chí Khánh",
      roles: {
        backend: "Backend Developer",
        data: "Data Engineer",
        bi: "BI Specialist",
      },
      tagline: "Xây dựng hệ thống mở rộng, insight có ý nghĩa.",
      viewProjects: "Xem Dự án",
      contactMe: "Liên hệ ngay",
    },
    about: {
      title: "Giới thiệu",
      stats: {
        backend: "Backend Focus",
        fullstack: "Full Stack",
        dataDriven: "Data Driven",
        automation: "Automation",
      },
    },
    projects: {
      title: "Dự án nổi bật",
      subtitle: "Tuyển chọn các dự án thể hiện chuyên môn về backend, data engineering và automation.",
      keyFeatures: "Tính năng chính",
      techStack: "Tech Stack",
      viewSource: "Xem Source",
      liveDemo: "Demo",
      private: "Private",
      public: "Public",
      challenges: "Thách thức",
      solutions: "Giải pháp",
    },
    experience: {
      title: "Kinh nghiệm làm việc",
    },
    contact: {
      title: "Liên hệ",
      description: "Tôi đang mở cơ hội cho các dự án hợp tác mới. Dù bạn có câu hỏi hay chỉ muốn chào hỏi, tôi sẽ cố gắng phản hồi sớm nhất có thể!",
      emailMe: "Email cho tôi",
      orFindMe: "hoặc tìm tôi tại",
      sendMessage: "Gửi tin nhắn",
      emailCopied: "Đã copy email!",
    },
    footer: {
      rights: "All rights reserved.",
      backToTop: "Lên đầu trang",
      builtWith: "Xây dựng với Next.js, Tailwind CSS và Framer Motion",
    },
    theme: {
      dark: "Dark",
      light: "Light",
    },
    lang: {
      vi: "Tiếng Việt",
      en: "English",
    },
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      title: "Huỳnh Văn Chí Khánh",
      roles: {
        backend: "Backend Developer",
        data: "Data Engineer",
        bi: "BI Specialist",
      },
      tagline: "Building systems that scale, insight that matters.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
    },
    about: {
      title: "About Me",
      stats: {
        backend: "Backend Focus",
        fullstack: "Full Stack",
        dataDriven: "Data Driven",
        automation: "Automation",
      },
    },
    projects: {
      title: "Featured Projects",
      subtitle: "A selection of projects showcasing my expertise in backend development, data engineering, and automation.",
      keyFeatures: "Key Features",
      techStack: "Tech Stack",
      viewSource: "View Source",
      liveDemo: "Live Demo",
      private: "Private",
      public: "Public",
      challenges: "Challenges",
      solutions: "Solutions",
    },
    experience: {
      title: "Work Experience",
    },
    contact: {
      title: "Get In Touch",
      description: "I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
      emailMe: "Email me at",
      orFindMe: "or find me on",
      sendMessage: "Send Message",
      emailCopied: "Email copied!",
    },
    footer: {
      rights: "All rights reserved.",
      backToTop: "Back to top",
      builtWith: "Built with Next.js, Tailwind CSS, and Framer Motion",
    },
    theme: {
      dark: "Dark",
      light: "Light",
    },
    lang: {
      vi: "Tiếng Việt",
      en: "English",
    },
  },
};

type TranslationKey = string;
type TranslationMap = typeof translations.vi;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let result: unknown = obj;
  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof result === "string" ? result : path;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("vi");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored && (stored === "vi" || stored === "en")) {
      setLocaleState(stored);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("vi")) {
        setLocaleState("vi");
      } else {
        setLocaleState("en");
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("locale", locale);
    }
  }, [locale, mounted]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const t = (key: TranslationKey): string => {
    const translation = translations[locale];
    return getNestedValue(translation as unknown as Record<string, unknown>, key);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
