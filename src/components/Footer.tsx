"use client";

import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { ExternalLink, Twitter, Linkedin, Youtube, MessageCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const { t, isRTL } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: t.nav.calculators, href: "#calculators" },
      { label: t.nav.ai, href: "#ai" },
      { label: t.nav.about, href: "#about" },
    ],
    resources: [
      { label: t.nav.academy, href: "https://infinityalgoacademy.net/", external: true },
      { label: "Documentation", href: "#" },
      { label: "API", href: "#" },
    ],
    legal: [
      { label: t.footer.privacy, href: "#" },
      { label: t.footer.terms, href: "#" },
      { label: t.footer.disclaimerLink, href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: MessageCircle, href: "#", label: "Discord" },
  ];

  return (
    <footer className="relative mt-20 border-t border-primary/20 bg-gradient-to-b from-transparent to-primary/5">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo size="md" className="mb-4" />
            <p className="text-muted-foreground text-sm mt-4 max-w-sm">
              {t.footer.description}
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/20 hover:text-primary transition-all"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <Icon className="w-5 h-5" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t.footer.product}</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t.footer.resources}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t.footer.legal}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Academy Promo Banner */}
        <div className="mt-12 p-6 rounded-xl glass-card bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-foreground">{t.footer.readyToMaster}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {t.footer.joinAcademyDesc}
              </p>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-accent-foreground hover:opacity-90 shrink-0"
            >
              <a
                href="https://infinityalgoacademy.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.footer.joinAcademy}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {t.footer.copyright}
          </p>
          <p className="text-sm text-muted-foreground">
            {t.footer.poweredBy}{" "}
            <a
              href="https://infinityalgoacademy.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Infinity Algo Academy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
