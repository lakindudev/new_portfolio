"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import GridBackground from "@/components/ui/grid-background";
import { Spotlight } from "@/components/ui/spotlight";

export default function About() {
  console.log("About component rendered");
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  return (
    <section 
      id="about" 
      className="relative section-padding min-h-screen flex items-center overflow-hidden"
      ref={sectionRef}
    >
      <GridBackground className="absolute inset-0 dark:bg-neutral-900/90 bg-slate-100/90">
        {/* Empty for background effect */}
      </GridBackground>
      
      {/* Add spotlights for visual consistency with other sections */}
      <Spotlight 
        className="-left-40 top-40" 
        fill={theme === "dark" ? "var(--accent)" : "var(--primary)"}
      />
      
      <Spotlight 
        className="right-20 bottom-40" 
        fill={theme === "dark" ? "var(--primary)" : "var(--secondary)"}
      />
      
      <div className="container-width relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-transparent bg-clip-text">About Me</h2>
          <div className="w-20 h-1 bg-[var(--accent)] mx-auto mb-8"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-[var(--accent)]/20 to-[var(--primary)]/20 blur-xl"></div>
            <div className="relative overflow-hidden rounded-xl border border-[var(--accent)]/30 shadow-2xl">
              <Image 
                src="/002.jpg" 
                alt="Lakindu Perera" 
                width={600} 
                height={800} 
                className="w-full h-auto object-cover" 
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-[var(--accent)]">Who I Am</h3>
            <div className="prose prose-lg dark:prose-invert">
              <p className="mb-4">
                I am an undergraduate Computer Science student at the Informatics Institute of Technology (IIT), affiliated with the University of Westminster. I am passionate about problem-solving and have experience working collaboratively in team environments. My expertise lies in full-stack web development, database systems, and software development.
              </p>
              <p>
                I specialize in building scalable and user-friendly full-stack applications using React, Next.js, Java, Python, and Spring Boot. Passionate about solving real-world problems, I aim to leverage AI and web technologies to develop efficient, data-driven solutions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
