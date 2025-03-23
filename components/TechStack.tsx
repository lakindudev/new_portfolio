"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import { useTheme } from "@/contexts/ThemeContext";
import { Spotlight } from "./ui/spotlight";
import GridBackground from "@/components/ui/grid-background";

const techStack = [
  { name: "Python", icon: "/py.svg", category: "Languages" },
  { name: "Java", icon: "/java.svg", category: "Languages" },
  { name: "JavaScript", icon: "/js.svg", category: "Languages" },
  { name: "HTML", icon: "/html.svg", category: "Frontend" },
  { name: "CSS", icon: "/css.svg", category: "Frontend" },
  { name: "React", icon: "/re.svg", category: "Frontend" },
  { name: "NextJS", icon: "/next.svg", category: "Frontend" },
  { name: "TailwindCSS", icon: "/tail.svg", category: "Frontend" },
  { name: "Bootstrap", icon: "/bootstrap.svg", category: "Frontend" },
  { name: "NodeJS", icon: "/node.svg", category: "Backend" },
  { name: "Spring Boot", icon: "/spring.svg", category: "Backend" },
  { name: "MySQL", icon: "/mysql.svg", category: "Database" },
  { name: "PostgreSQL", icon: "/postgresql.svg", category: "Database" },
  { name: "Figma", icon: "/figma.svg", category: "Tools" },
  { name: "Trello", icon: "/trello.svg", category: "Tools" },
  { name: "Postman", icon: "/postman.svg", category: "Tools" },
];

const categories = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
];

const TechStack = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTech =
    activeCategory === "All"
      ? techStack
      : techStack.filter((tech) => tech.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative py-20 overflow-hidden w-full"
    >
      <GridBackground className="absolute inset-0 dark:bg-neutral-950/80 bg-slate-50/80">
        {/* Empty for background effect */}
      </GridBackground>
      
      {/* Dual spotlights for more dynamic lighting */}
      <Spotlight 
        className="right-0 top-20 md:right-60" 
        fill={theme === "dark" ? "var(--primary)" : "var(--secondary)"}
      />
      
      <Spotlight 
        className="left-0 bottom-20 md:left-40" 
        fill={theme === "dark" ? "var(--accent)" : "var(--primary)"}
      />
      
      <div className="container-width relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-transparent bg-clip-text">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-[var(--accent)] mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-[var(--foreground)]/80 mb-8">
            A collection of technologies and tools I&apos;ve mastered throughout my
            journey as a developer.
          </p>
        </motion.div>

        {/* Category Filter - Updated for cohesive styling */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-[var(--accent)] text-white" 
                  : "bg-[var(--card-bg)] text-[var(--foreground)] hover:bg-[var(--card-bg)]/70"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Tech Grid - Enhanced for visual appeal */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              className={`flex flex-col items-center p-6 rounded-xl backdrop-blur-sm transition-all ${
                theme === 'light'
                  ? 'bg-white/80 border border-gray-200 hover:shadow-lg hover:border-[var(--primary)]/30'
                  : 'bg-black/30 border border-gray-800 hover:border-[var(--accent)]/50 hover:bg-black/40'
              }`}
              whileHover={{ y: -5, scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05 // Staggered animation
              }}
            >
              <div className="w-12 h-12 mb-4 flex items-center justify-center relative">
                {/* Subtle glow effect */}
                <div className={`absolute inset-0 rounded-full opacity-30 filter blur-md ${
                  theme === 'light' 
                    ? 'bg-[var(--primary)]/20' 
                    : 'bg-[var(--accent)]/20'
                }`}></div>
                
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain relative z-10"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"; // Fallback image
                  }}
                />
              </div>
              <h3 className="font-medium text-center text-[var(--foreground)]">
                {tech.name}
              </h3>
              <span className="text-xs mt-1 text-[var(--foreground)]/70">
                {tech.category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack; 