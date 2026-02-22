"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ExternalLink, Calculator, Brain, Info, Home, Globe } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/i18n";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage, isRTL } = useTranslation();

  const navItems = [
    { id: "home", label: t.nav.home, icon: Home },
    { id: "calculators", label: t.nav.calculators, icon: Calculator },
    { id: "ai", label: t.nav.ai, icon: Brain },
    { id: "about", label: t.nav.about, icon: Info },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigate("home")}
          >
            <Logo size="sm" />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="rounded-full"
              title={language === 'en' ? 'العربية' : 'English'}
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only text-xs ml-1">{language === 'en' ? 'AR' : 'EN'}</span>
            </Button>

            {/* Academy Button */}
            <Button
              asChild
              className="hidden sm:flex bg-gradient-to-r from-primary to-accent-foreground hover:opacity-90 transition-opacity"
            >
              <a
                href="https://infinityalgoacademy.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.nav.academy}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => {
                      onNavigate(item.id);
                      setIsOpen(false);
                    }}
                    className={`w-full justify-start gap-3 ${
                      activeSection === item.id
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                );
              })}
              <Button
                asChild
                className="w-full mt-4 bg-gradient-to-r from-primary to-accent-foreground"
              >
                <a
                  href="https://infinityalgoacademy.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.nav.academy}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
