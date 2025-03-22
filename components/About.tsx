"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
          <p className="max-w-3xl mx-auto text-lg text-[var(--foreground)]/80">
            I'm a passionate developer with expertise in building modern web applications. 
            With a strong foundation in frontend and backend technologies, I create 
            engaging digital experiences that solve real-world problems.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
              </svg>
            }
            title="Web Development"
            description="Specialized in building responsive, performant web applications using modern JavaScript frameworks and libraries."
            delay={0.1}
          />
          
          <Card 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
              </svg>
            }
            title="UI/UX Design"
            description="Passionate about creating intuitive user interfaces with a focus on accessibility and user experience."
            delay={0.2}
          />
          
          <Card 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            }
            title="Performance Optimization"
            description="Expert in optimizing web applications for speed and efficiency, ensuring smooth user experiences."
            delay={0.3}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 card p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">My Journey</h3>
              <p className="text-[var(--foreground)]/80 mb-4">
                With over 5 years of experience in web development, I've worked on a diverse range of projects
                from e-commerce platforms to complex SaaS applications. My passion for clean code and
                innovative solutions drives me to constantly improve and learn new technologies.
              </p>
              <p className="text-[var(--foreground)]/80">
                I believe in creating digital experiences that not only look great but also deliver
                exceptional performance and functionality.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Education & Experience</h3>
              <div className="mb-4">
                <div className="font-bold">Senior Frontend Developer</div>
                <div className="text-[var(--accent)]">Tech Innovation Inc. | 2020-Present</div>
              </div>
              <div className="mb-4">
                <div className="font-bold">Web Developer</div>
                <div className="text-[var(--accent)]">Digital Solutions Agency | 2018-2020</div>
              </div>
              <div>
                <div className="font-bold">BSc Computer Science</div>
                <div className="text-[var(--accent)]">University of Technology | 2014-2018</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 