import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { I18nProvider } from "@/contexts/I18nContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Huỳnh Văn Chí Khan — Backend Developer | Data Engineer",
  description: "Backend Developer with expertise in NestJS, Python, Data Engineering, and Business Intelligence. Building systems that scale, insight that matters.",
  keywords: ["Backend Developer", "Data Engineer", "NestJS", "Python", "Azure", "Portfolio"],
  authors: [{ name: "Huỳnh Văn Chí Khan" }],
  creator: "Huỳnh Văn Chí Khan",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://huynhkhandev.cloud",
    siteName: "Huỳnh Văn Chí Khan",
    title: "Huỳnh Văn Chí Khan — Backend Developer | Data Engineer",
    description: "Backend Developer with expertise in NestJS, Python, Data Engineering, and Business Intelligence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Huỳnh Văn Chí Khan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Huỳnh Văn Chí Khan — Backend Developer | Data Engineer",
    description: "Backend Developer with expertise in NestJS, Python, Data Engineering, and Business Intelligence.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
