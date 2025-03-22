"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/moving-border-button";
import GridBackground from "@/components/ui/grid-background";
import { useTheme } from "@/contexts/ThemeContext";
import { Spotlight } from "@/components/ui/spotlight";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const dynamicTextVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      damping: 12,
      stiffness: 100 
    }
  }
};

export default function Hero() {
  const { theme } = useTheme();
  const [tagline, setTagline] = useState("Transforming Concepts into Seamless User Experiences.");
  const dynamicText = "Undergraduate at University of Westminster.";
  
  // This would typically connect to an AI service
  useEffect(() => {
    // Simulating AI-generated tagline with predefined options
    const taglines = [
      "Transforming Concepts into Seamless User Experiences.",
      "Crafting interfaces that blur reality and imagination.",
      "Where code meets creativity and innovation thrives.",
      "Building digital experiences that inspire."
    ];
    
    // Pick a random tagline
    const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
    setTagline(randomTagline);
  }, []);
  
  return (
    <GridBackground className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Spotlight 
        className="top-0 left-0 md:left-60 md:-top-20" 
        fill={theme === "dark" ? "var(--accent)" : "var(--primary)"}
      />
      
      <div className="container-width text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <Image 
            src="/lakindu.JPG" 
            alt="Profile" 
            width={150} 
            height={150}
            className={`rounded-full shadow-xl mx-auto ${
              theme === 'light' 
                ? 'border-4 border-gray-200' 
                : 'border-4 border-white/30'
            }`}
          />
        </motion.div>
        
        <motion.h1 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-transparent bg-clip-text"
        >
          Hello, I'm <span className="text-[var(--accent)]">Lakindu Perera</span>
        </motion.h1>
        
        <motion.div
          variants={dynamicTextVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl md:text-3xl font-medium mb-6 h-10"
        >
          {dynamicText.split("").map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-lg md:text-xl text-[var(--foreground)]/80 max-w-2xl mx-auto mb-10"
        >
          {tagline}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <Button
            as="a"
            href="/lakindu_cv.pdf"
            download
            className={`font-medium backdrop-blur-sm border-[var(--accent)]/20 ${
              theme === 'light' 
                ? 'bg-white/30 text-gray-800' 
                : 'bg-black/50 text-white'
            }`}
            borderClassName="bg-[radial-gradient(var(--accent)_40%,transparent_60%)]"
            containerClassName="h-16 w-56 px-0"
          >
            Download CV ↓
          </Button>
          
          <Button
            as="a"
            href="#projects"
            className={`font-medium backdrop-blur-sm border-[var(--primary)]/20 ${
              theme === 'light' 
                ? 'bg-white/30 text-gray-800' 
                : 'bg-black/50 text-white'
            }`}
            borderClassName="bg-[radial-gradient(var(--primary)_40%,transparent_60%)]"
            containerClassName="h-16 w-56 px-0"
          >
            View Projects →
          </Button>
        </motion.div>
      </div>
    </GridBackground>
  );
} 