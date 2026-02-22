import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Infinity Algo by Jeremy | AI Trading Intelligence Platform",
  description: "AI Decision Intelligence Platform for Serious Traders. 22+ professional trading calculators, AI-powered market analysis, and expert education from Infinity Algo Academy.",
  keywords: [
    "trading calculators",
    "Fibonacci calculator",
    "position size calculator",
    "risk reward ratio",
    "AI trading analysis",
    "forex tools",
    "crypto trading",
    "stock analysis",
    "Infinity Algo Academy",
    "trading intelligence",
  ],
  authors: [{ name: "Jeremy - Infinity Algo" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Infinity Algo by Jeremy | AI Trading Intelligence",
    description: "AI Decision Intelligence Platform for Serious Traders. 22+ calculators, AI analysis, and expert education.",
    url: "https://infinityalgoacademy.net/",
    siteName: "Infinity Algo",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Infinity Algo - AI Trading Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinity Algo by Jeremy",
    description: "AI Decision Intelligence Platform for Serious Traders",
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
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
