"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import { useTheme } from "@/contexts/ThemeContext";
import { Spotlight } from "./ui/spotlight";

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

  useEffect(() => {
    // Logic that depends on certain variables
  }, [activeCategory]); // Ensure all dependencies are included

  return (
    <section
      id="skills"
      className={`relative py-20 flex flex-col items-center justify-center overflow-hidden ${
        theme === 'light' 
          ? 'bg-gray-100' 
          : 'bg-gray-900'
      }`}
    >
      <Spotlight 
        className="right-0 -top-40 md:right-60" 
        fill={theme === "dark" ? "var(--primary)" : "var(--secondary)"}
      />
      
      <div className="w-full max-w-7xl relative z-10">
        <h2 className={`text-4xl font-bold text-center mb-4 ${
          theme === 'light' ? 'text-gray-800' : 'text-white'
        }`}>
          Technical Skills
        </h2>
        <p className={`text-center mb-10 max-w-2xl mx-auto ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          A collection of technologies and tools I&apos;ve mastered throughout my
          journey as a developer.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? theme === 'light'
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-white text-black'
                  : theme === 'light'
                    ? 'bg-white text-gray-800 hover:bg-gray-200' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredTech.map((tech) => (
            <motion.div
              key={tech.name}
              className={`flex flex-col items-center p-6 rounded-xl backdrop-blur-sm transition-all ${
                theme === 'light'
                  ? 'bg-white/80 border border-gray-200 hover:border-gray-400 shadow-sm'
                  : 'bg-gray-800/50 border border-gray-700 hover:border-gray-500'
              }`}
              whileHover={{ y: -5, scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 mb-4 flex items-center justify-center">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"; // Fallback image
                  }}
                />
              </div>
              <h3 className={`font-medium text-center ${
                theme === 'light' ? 'text-gray-800' : 'text-white'
              }`}>
                {tech.name}
              </h3>
              <span className={`text-xs mt-1 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
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