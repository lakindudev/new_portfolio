"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function Card({ icon, title, description, delay }: CardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      className="card p-6 h-full flex flex-col"
    >
      <div className="mb-4 text-[var(--accent)]">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-[var(--foreground)]/80 flex-grow">{description}</p>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  return (
    <section id="about" className="section-padding" ref={sectionRef}>
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
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