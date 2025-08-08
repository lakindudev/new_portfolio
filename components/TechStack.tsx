"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import { useTheme } from "@/contexts/ThemeContext";
import { Spotlight } from "./ui/spotlight";
import GridBackground from "@/components/ui/grid-background";

const techStack = [
  { name: "Python", icon: "/py.svg", category: "Languages", level: "Advanced" },
  { name: "Java", icon: "/java.svg", category: "Languages", level: "Advanced" },
  { name: "JavaScript", icon: "/js.svg", category: "Languages", level: "Advanced" },
  { name: "TypeScript", icon: "/ts.svg", category: "Languages", level: "Intermediate" },
  { name: "HTML", icon: "/html.svg", category: "Frontend", level: "Advanced" },
  { name: "CSS", icon: "/css.svg", category: "Frontend", level: "Advanced" },
  { name: "React", icon: "/re.svg", category: "Frontend", level: "Advanced" },
  { name: "NextJS", icon: "/next.svg", category: "Frontend", level: "Advanced" },
  { name: "TailwindCSS", icon: "/tail.svg", category: "Frontend", level: "Advanced" },
  { name: "Bootstrap", icon: "/bootstrap.svg", category: "Frontend", level: "Intermediate" },
  { name: "NodeJS", icon: "/node.svg", category: "Backend", level: "Advanced" },
  { name: "Spring Boot", icon: "/spring.svg", category: "Backend", level: "Advanced" },
  { name: "MySQL", icon: "/mysql.svg", category: "Database", level: "Intermediate" },
  { name: "PostgreSQL", icon: "/postgresql.svg", category: "Database", level: "Intermediate" },
  { name: "Docker", icon: "/dockerName.svg", category: "DevOps", level: "Intermediate" },
  { name: "Git", icon: "/git.svg", category: "DevOps", level: "Advanced" },
  { name: "Figma", icon: "/figma.svg", category: "Tools", level: "Intermediate" },
  { name: "Trello", icon: "/trello.svg", category: "Tools", level: "Advanced" },
  { name: "Postman", icon: "/postman.svg", category: "Tools", level: "Advanced" },
];

const categories = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
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
      className="relative py-24 overflow-hidden w-full min-h-screen flex items-center"
    >
      <GridBackground className="absolute inset-0 dark:bg-neutral-950/90 bg-slate-50/90">
        {/* Empty for background effect */}
      </GridBackground>
      
      {/* Enhanced spotlights for dynamic lighting */}
      <Spotlight 
        className="right-0 top-20 md:right-60" 
        fill="var(--primary)"
      />
      
      <Spotlight 
        className="left-0 bottom-20 md:left-40" 
        fill="var(--accent)"
      />
      
      <Spotlight 
        className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
        fill="var(--secondary)"
      />
      
      <div className="container-width relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-transparent bg-clip-text">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] mx-auto mb-8 rounded-full"></div>
          <p className="max-w-3xl mx-auto text-lg text-[var(--foreground)]/80 mb-8 leading-relaxed">
            A comprehensive collection of technologies and tools I&apos;ve mastered throughout my
            journey as a developer, from programming languages to modern frameworks.
          </p>
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white border-transparent shadow-lg shadow-[var(--accent)]/25" 
                  : "bg-[var(--card-bg)]/50 text-[var(--foreground)] border-[var(--card-border)] hover:bg-[var(--card-bg)] hover:border-[var(--accent)]/30 backdrop-blur-sm"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17,
                delay: index * 0.1
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Tech Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="group relative flex flex-col items-center p-6 rounded-2xl backdrop-blur-md transition-all duration-300 bg-gradient-to-br from-[var(--card-bg)]/20 to-[var(--card-bg)]/10 border border-[var(--card-border)]/50 hover:border-[var(--accent)]/50 hover:bg-gradient-to-br hover:from-[var(--card-bg)]/30 hover:to-[var(--card-bg)]/20"
              whileHover={{ 
                y: -8, 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--primary)]/0 via-[var(--accent)]/0 to-[var(--secondary)]/0 group-hover:from-[var(--primary)]/10 group-hover:via-[var(--accent)]/10 group-hover:to-[var(--secondary)]/10 transition-all duration-500 blur-xl"></div>
              
              {/* Icon container with enhanced styling */}
              <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                {/* Icon background glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 blur-md group-hover:blur-lg transition-all duration-300"></div>
                
                {/* Icon */}
                <div className="relative z-10 w-12 h-12 flex items-center justify-center bg-[var(--card-bg)]/50 rounded-xl backdrop-blur-sm border border-[var(--card-border)]/30 group-hover:border-[var(--accent)]/50 transition-all duration-300">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain filter group-hover:brightness-110 transition-all duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="text-center">
                <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300 mb-1">
                  {tech.name}
                </h3>
                <span className="text-xs text-[var(--foreground)]/60 group-hover:text-[var(--foreground)]/80 transition-colors duration-300">
                  {tech.category}
                </span>
                <div className="mt-2">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    tech.level === "Advanced" 
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : tech.level === "Intermediate"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  }`}>
                    {tech.level}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-8 p-6 rounded-2xl bg-gradient-to-r from-[var(--card-bg)]/20 to-[var(--card-bg)]/10 border border-[var(--card-border)]/50 backdrop-blur-md">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--accent)]">19</div>
              <div className="text-sm text-[var(--foreground)]/70">Technologies</div>
            </div>
            <div className="w-px h-12 bg-[var(--card-border)]"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--primary)]">6</div>
              <div className="text-sm text-[var(--foreground)]/70">Categories</div>
            </div>
            <div className="w-px h-12 bg-[var(--card-border)]"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--secondary)]">3+</div>
              <div className="text-sm text-[var(--foreground)]/70">Years Experience</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack; 