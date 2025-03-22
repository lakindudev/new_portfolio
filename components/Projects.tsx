"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with Next.js and Stripe integration.",
    image: "/project-placeholder-1.jpg",
    category: "web",
    technologies: ["Next.js", "React", "Stripe", "Tailwind CSS"],
    link: "#"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity app with real-time updates and team collaboration features.",
    image: "/project-placeholder-2.jpg",
    category: "app",
    technologies: ["React", "Firebase", "TypeScript", "Material UI"],
    link: "#"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A stunning portfolio website with smooth animations and responsive design.",
    image: "/project-placeholder-3.jpg",
    category: "web",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    link: "#"
  },
  {
    id: 4,
    title: "AI Content Generator",
    description: "An AI-powered application that generates customized content for various purposes.",
    image: "/project-placeholder-4.jpg",
    category: "ai",
    technologies: ["Python", "OpenAI API", "React", "FastAPI"],
    link: "#"
  },
  {
    id: 5,
    title: "Fitness Tracking Mobile App",
    description: "A mobile application for tracking workouts and fitness progress.",
    image: "/project-placeholder-5.jpg",
    category: "app",
    technologies: ["React Native", "TypeScript", "Redux", "Node.js"],
    link: "#"
  },
  {
    id: 6,
    title: "Smart Home Dashboard",
    description: "A dashboard for controlling and monitoring smart home devices.",
    image: "/project-placeholder-6.jpg",
    category: "iot",
    technologies: ["React", "Node.js", "MQTT", "Chart.js"],
    link: "#"
  }
];

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  return (
    <section id="projects" className="section-padding bg-[var(--card-bg)]/30" ref={sectionRef}>
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-[var(--accent)] mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-[var(--foreground)]/80 mb-8">
            Explore my latest projects showcasing my skills and experience in web development,
            mobile applications, and more.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["all", "web", "app", "ai", "iot"].map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === category 
                    ? "bg-[var(--accent)] text-white" 
                    : "bg-[var(--card-bg)] text-[var(--foreground)] hover:bg-[var(--card-bg)]/70"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });
  
  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="card overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{ objectFit: "cover" }}
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <div className="flex flex-wrap gap-1">
              {project.technologies.map(tech => (
                <span key={tech} className="text-xs bg-[var(--accent)]/80 text-white px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">{project.title}</h3>
        <p className="text-[var(--foreground)]/70 mb-4">{project.description}</p>
        <a 
          href={project.link} 
          className="text-[var(--accent)] hover:text-[var(--accent)]/80 font-medium flex items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      </div>
    </motion.article>
  );
} 