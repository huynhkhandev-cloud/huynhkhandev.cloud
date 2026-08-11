import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-foreground-muted">
            © {currentYear} Huỳnh Văn Chí Khánh. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/huynhkhandev-cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-accent-primary transition-colors"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://linkedin.com/in/khanhhuynh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-accent-primary transition-colors"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="mailto:kh@example.com"
              className="text-foreground-muted hover:text-accent-primary transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Back to Top */}
          <a
            href="#"
            className="flex items-center gap-2 text-sm text-foreground-muted hover:text-accent-primary transition-colors"
          >
            Back to top
            <ArrowUp size={16} />
          </a>
        </div>

        {/* Built with */}
        <p className="mt-6 text-center text-xs text-foreground-muted/60">
          Built with Next.js, Tailwind CSS, and Framer Motion
        </p>
      </div>
    </footer>
  );
}
