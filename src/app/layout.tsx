import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://infinityalgo.com'),
  title: "Infinity Algo by Jeremy | AI-Powered Trading Platform",
  description: "World-class AI trading platform with advanced charting, real-time analysis, trading calculators, and AI-powered insights. Trade smarter with Infinity Algo.",
  keywords: ["trading", "AI trading", "algorithmic trading", "forex", "crypto", "stocks", "technical analysis", "trading calculators", "AI assistant"],
  authors: [{ name: "Jeremy" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Infinity Algo by Jeremy",
    description: "AI-Powered Trading Platform for Professional Traders",
    url: "https://infinityalgo.com",
    siteName: "Infinity Algo",
    type: "website",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinity Algo by Jeremy",
    description: "AI-Powered Trading Platform for Professional Traders",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
