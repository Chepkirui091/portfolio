import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageLoader } from "@/components/PageLoader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Daphne Chepkirui | Full-Stack Software Developer",
  description:
    "Full-stack software developer in Nairobi. Web with React and Next.js, APIs with NestJS and Django, mobile with Expo. Healthcare, insurance, fintech, and marketplace products.",
  keywords: [
    "Full-Stack Developer",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "NestJS",
    "Expo",
    "React Native",
    "Nairobi",
  ],
  authors: [{ name: "Daphne Chepkirui" }],
  openGraph: {
    title: "Daphne Chepkirui | Full-Stack Software Developer",
    description:
      "Building modern web and mobile applications with React, Next.js, NestJS, Django, PostgreSQL, and AI-assisted development workflows.",
    type: "website",
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider>
          <PageLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
