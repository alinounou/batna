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
  title: "Batna | AI Trading Intelligence Platform | بتنة",
  description: "AI Decision Intelligence Platform for Serious Traders. 22+ professional trading calculators, AI-powered market analysis. منصة ذكاء التداول للمتداولين الجادين.",
  keywords: [
    "Batna",
    "بتنة",
    "trading calculators",
    "Fibonacci calculator",
    "position size calculator",
    "risk reward ratio",
    "AI trading analysis",
    "forex tools",
    "crypto trading",
    "stock analysis",
    "trading intelligence",
    "حاسبة التداول",
    "تحليل السوق",
    "حاسبة فيبوناتشي",
  ],
  authors: [{ name: "Batna Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Batna | AI Trading Intelligence | بتنة",
    description: "AI Decision Intelligence Platform for Serious Traders. منصة ذكاء التداول للمتداولين الجادين.",
    url: "https://batna.trading",
    siteName: "Batna",
    type: "website",
    locale: 'en_US',
    alternateLocale: ['ar_SA'],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Batna - AI Trading Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Batna | AI Trading Intelligence",
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
