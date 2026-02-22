"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

export function Logo({ className = "", showText = true, size = "md" }: {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const { t } = useTranslation();
  
  const sizes = {
    sm: { logo: "w-8 h-8", text: "text-xl" },
    md: { logo: "w-12 h-12", text: "text-2xl" },
    lg: { logo: "w-20 h-20", text: "text-4xl" },
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.svg
        viewBox="0 0 100 100"
        className={`${sizes[size].logo} transition-all duration-300`}
        initial={{ rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <defs>
          <linearGradient id="batnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <filter id="batnaGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Hexagonal shape representing "Batna" ( Algerian city known for dates ) */}
        <motion.path
          d="M50 5 
             L85 25 
             L85 65 
             L50 85 
             L15 65 
             L15 25 Z"
          fill="none"
          stroke="url(#batnaGradient)"
          strokeWidth="3"
          filter="url(#batnaGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Inner B shape */}
        <motion.path
          d="M35 30 
             L35 70 
             L35 30 
             Q55 30 55 45 
             Q55 55 40 55 
             Q60 55 60 65 
             Q60 75 40 75 
             L35 70"
          fill="none"
          stroke="url(#batnaGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
        
        {/* Decorative dots */}
        <motion.circle
          cx="70"
          cy="35"
          r="3"
          fill="#F59E0B"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />
        <motion.circle
          cx="25"
          cy="50"
          r="2"
          fill="#EC4899"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 1.7 }}
        />
      </motion.svg>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`${sizes[size].text} font-bold text-gradient-purple`}>
            {t.brand.name}
          </span>
          <span className="text-xs text-muted-foreground -mt-1">
            {t.brand.tagline}
          </span>
        </div>
      )}
    </div>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`w-10 h-10 ${className}`}
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      <defs>
        <linearGradient id="batnaGradientSmall" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <path
        d="M50 5 L85 25 L85 65 L50 85 L15 65 L15 25 Z"
        fill="none"
        stroke="url(#batnaGradientSmall)"
        strokeWidth="3"
      />
      <path
        d="M35 30 L35 70 L35 30 Q55 30 55 45 Q55 55 40 55 Q60 55 60 65 Q60 75 40 75 L35 70"
        fill="none"
        stroke="url(#batnaGradientSmall)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
