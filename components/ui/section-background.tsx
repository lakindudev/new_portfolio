"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

type SectionColorScheme = 
  | "primary" // Blue-based gradient
  | "secondary" // Purple-based gradient
  | "accent" // Green-based gradient
  | "neutral" // Subtle neutral gradient
  | "dark"; // Dark gradient

export default function SectionBackground({
  children,
  className,
  colorScheme = "neutral",
  withGrid = true,
}: {
  children: React.ReactNode;
  className?: string;
  colorScheme?: SectionColorScheme;
  withGrid?: boolean;
}) {
  // Color scheme configurations
  const bgStyles = {
    primary: "bg-gradient-to-b from-blue-500/5 via-transparent to-transparent dark:from-blue-900/10",
    secondary: "bg-gradient-to-b from-purple-500/5 via-transparent to-transparent dark:from-purple-900/10",
    accent: "bg-gradient-to-b from-violet-500/5 via-transparent to-transparent dark:from-violet-900/10",
    neutral: "bg-gradient-to-b from-gray-100 via-transparent to-transparent dark:from-gray-900/20",
    dark: "bg-gradient-to-b from-gray-900/30 via-gray-900/10 to-transparent dark:from-gray-800/30"
  };
  
  return (
    <div className={cn("relative w-full overflow-hidden", bgStyles[colorScheme], className)}>
      {/* Optional grid background */}
      {withGrid && (
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:60px_60px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,rgba(38,38,38,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(38,38,38,0.4)_1px,transparent_1px)]",
            "opacity-[0.25] dark:opacity-[0.25]"
          )}
        />
      )}
      
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent"></div>
      
      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 