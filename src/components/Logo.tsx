"use client";

import { motion } from "framer-motion";

export function Logo({ className = "", showText = true, size = "md" }: {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: { logo: "w-6 h-6", text: "text-lg" },
    md: { logo: "w-10 h-10", text: "text-2xl" },
    lg: { logo: "w-16 h-16", text: "text-4xl" },
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.svg
        viewBox="0 0 100 50"
        className={`${sizes[size].logo} transition-all duration-300`}
        initial={{ rotate: 0 }}
        whileHover={{ scale: 1.1 }}
      >
        <defs>
          <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d="M25 25 
             C25 15, 35 10, 45 15 
             C55 20, 55 30, 50 35 
             C45 40, 35 40, 30 35 
             C25 30, 25 20, 35 15 
             C45 10, 55 15, 55 25 
             C55 35, 65 40, 75 35 
             C85 30, 85 20, 75 15 
             C65 10, 55 15, 55 25"
          fill="none"
          stroke="url(#infinityGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </motion.svg>
      {showText && (
        <div className="flex flex-col">
          <span className={`${sizes[size].text} font-bold text-gradient-blue`}>
            infinity algo
          </span>
          <span className="text-xs text-muted-foreground -mt-1">
            by Jeremy
          </span>
        </div>
      )}
    </div>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 100 50"
      className={`w-8 h-4 ${className}`}
      whileHover={{ scale: 1.1 }}
    >
      <defs>
        <linearGradient id="infinityGradientSmall" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>
      <path
        d="M25 25 C25 15, 35 10, 45 15 C55 20, 55 30, 50 35 C45 40, 35 40, 30 35 C25 30, 25 20, 35 15 C45 10, 55 15, 55 25 C55 35, 65 40, 75 35 C85 30, 85 20, 75 15 C65 10, 55 15, 55 25"
        fill="none"
        stroke="url(#infinityGradientSmall)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
