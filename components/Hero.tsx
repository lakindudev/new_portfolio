"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/moving-border-button";
import GridBackground from "@/components/ui/grid-background";
import { useTheme } from "@/contexts/ThemeContext";
import { Spotlight } from "@/components/ui/spotlight";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const dynamicTextVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

export default function Hero() {
  const { theme } = useTheme();
  const [tagline, setTagline] = useState(
    "Transforming Concepts into Seamless User Experiences."
  );
  const dynamicText = "Undergraduate at University of Westminster.";

  // This would typically connect to an AI service
  useEffect(() => {
    // Simulating AI-generated tagline with predefined options
    const taglines = [
      "Bridging front-end elegance with back-end power.",
      "Transforming concepts into seamless digital experiences—end to end.",
      "Where code, creativity, and scalability converge.",
      "Building full-stack solutions that feel like magic.",
      "From database to UI—crafting smooth, intuitive experiences.",
      "Engineering robust backends and stunning frontends for the future.",
      "Full-stack innovation, limitless possibilities.",
    ];

    // Pick a random tagline
    const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
    setTagline(randomTagline);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Layer 1: Enhanced Grid Background with proper dark mode support */}
      <GridBackground className="absolute inset-0 dark:bg-neutral-950 bg-slate-50">
        {/* Empty for background effect */}
      </GridBackground>
      
      {/* Layer 2: Beam Collisions with custom colors for dark mode */}
      <BackgroundBeamsWithCollision className="absolute inset-0 bg-transparent">
        {/* Provide an empty fragment as children */}
        <>
          {/* Empty for beam effects only */}
        </>
      </BackgroundBeamsWithCollision>
      
      {/* Layer 3: Content with enhanced contrast */}
      <div className="relative min-h-screen flex items-center justify-center z-20">
        {/* Multiple spotlights for more dynamic lighting */}
        <Spotlight
          className="top-0 left-0 md:left-60 md:-top-20"
          fill={theme === "dark" ? "var(--accent)" : "var(--primary)"}
        />
        
        <Spotlight
          className="bottom-0 right-0 md:right-40 md:bottom-20"
          fill={theme === "dark" ? "var(--primary)" : "var(--accent)"}
        />

        <div className="container-width text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-transparent bg-clip-text"
          >
            Hello, I'm{" "}
            <span className="text-[var(--accent)]">Lakindu Perera</span>
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
                theme === "light"
                  ? "bg-white/30 text-gray-800"
                  : "bg-black/50 text-white"
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
                theme === "light"
                  ? "bg-white/30 text-gray-800"
                  : "bg-black/50 text-white"
              }`}
              borderClassName="bg-[radial-gradient(var(--primary)_40%,transparent_60%)]"
              containerClassName="h-16 w-56 px-0"
            >
              View Projects →
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
