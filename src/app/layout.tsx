import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Huỳnh Văn Chí Khánh — Backend Developer | Data Engineer",
  description: "Backend Developer with expertise in NestJS, Python, Data Engineering, and Business Intelligence. Building systems that scale, insight that matters.",
  keywords: ["Backend Developer", "Data Engineer", "NestJS", "Python", "Azure", "Portfolio"],
  authors: [{ name: "Huỳnh Văn Chí Khánh" }],
  creator: "Huỳnh Văn Chí Khánh",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://huynhkhandev.cloud",
    siteName: "Huỳnh Văn Chí Khánh",
    title: "Huỳnh Văn Chí Khánh — Backend Developer | Data Engineer",
    description: "Backend Developer with expertise in NestJS, Python, Data Engineering, and Business Intelligence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Huỳnh Văn Chí Khánh Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Huỳnh Văn Chí Khánh — Backend Developer | Data Engineer",
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
    <html lang="vi" className="dark">
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
