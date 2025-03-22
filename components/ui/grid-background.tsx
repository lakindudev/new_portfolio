"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function GridBackground({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={cn("relative w-full bg-white dark:bg-black", className)}>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:60px_60px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,rgba(38,38,38,0.7)_1px,transparent_1px),linear-gradient(to_bottom,rgba(38,38,38,0.7)_1px,transparent_1px)]",
          "transition-opacity duration-500"
        )}
      />
      
      {/* Dynamic gradient follow cursor */}
      <motion.div 
        className="absolute inset-0 opacity-70 pointer-events-none"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
        }}
        transition={{ type: "spring", damping: 20 }}
      />
      
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-black"></div>
      
      {/* Content container */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
} 