import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend, Roboto, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Indas Analytics | AI Agents for Enterprise ERP",
  description: "Automate finance, operations, and analytics with autonomous AI agents. The next generation of ERP intelligence for modern enterprises.",
  keywords: ["AI ERP", "Enterprise AI", "AI Agents", "Autonomous Finance", "ERP Automation", "Indas Analytics"],
  authors: [{ name: "Indas Analytics Team" }],
  openGraph: {
    title: "Indas Analytics | AI Agents for Enterprise ERP",
    description: "Automate complex enterprise workflows with autonomous AI agents that run your ERP smarter.",
    url: "https://indas-analytics.demo",
    siteName: "Indas Analytics",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Indas Analytics Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indas Analytics | AI Agents for Enterprise ERP",
    description: "Automate complex enterprise workflows with autonomous AI agents.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import CustomCursor from "@/components/CustomCursor";
import LenisProvider from "@/components/LenisProvider";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} ${roboto.variable} ${playfair.variable} antialiased`}
      >
        <ScrollProgress />
        <CustomCursor />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
