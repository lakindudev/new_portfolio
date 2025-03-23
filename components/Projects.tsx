"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";
import { PinContainer } from "@/components/ui/3d-pin";
import GridBackground from "@/components/ui/grid-background";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export default function Projects() {
  const { theme } = useTheme();
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "app", label: "Mobile Apps" },
    { id: "ai", label: "AI Projects" },
    { id: "iot", label: "IoT Solutions" },
  ];
  
  return (
    <section 
      id="projects" 
      className="relative section-padding overflow-hidden"
      ref={sectionRef}
    >
      <GridBackground className="absolute inset-0 dark:bg-neutral-900/90 bg-slate-100/90">
        {/* Empty for background effect */}
      </GridBackground>
      
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-transparent bg-clip-text">
            My Projects
          </h2>
          <div className="w-20 h-1 bg-[var(--accent)] mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-[var(--foreground)]/80 mb-10">
            Explore my latest projects showcasing my skills and experience in web development,
            mobile applications, and more.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <motion.button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  filter === category.id 
                    ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20" 
                    : `${theme === "dark" ? "bg-black/40" : "bg-white/70"} backdrop-blur-sm 
                       border border-[var(--card-border)] hover:border-[var(--accent)]/30`
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                variants={itemVariants}
              />
            ))
          ) : (
            <motion.div 
              className="col-span-full text-center py-10"
              variants={itemVariants}
            >
              <p className="text-lg text-[var(--foreground)]/70">
                No projects found in this category. Check back soon!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ 
  project, 
  index,
  variants
}: { 
  project: Project; 
  index: number;
  variants: any;
}) {
  const { theme } = useTheme();
  
  return (
    <motion.div
      variants={variants}
      className="w-full h-full"
    >
      <PinContainer 
        title={project.title} 
        href={project.link} 
        containerClassName="w-full h-[30rem]"
      >
        <div className={`flex flex-col w-full h-full rounded-2xl overflow-hidden border ${
          theme === "dark" 
            ? "bg-black/60 border-white/[0.08]" 
            : "bg-white/80 border-gray-200/80"
        }`}>
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform hover:scale-105 duration-500"
            />
            <div className={`absolute inset-0 ${
              theme === "dark"
                ? "bg-gradient-to-t from-black/80 to-transparent" 
                : "bg-gradient-to-t from-white/80 to-transparent"
            }`}></div>
          </div>
          
          <div className="flex flex-col p-6 flex-grow">
            <h3 className={`text-xl font-bold mb-3 ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}>{project.title}</h3>
            
            <p className={`text-sm mb-6 flex-grow ${
              theme === "dark" ? "text-white/70" : "text-gray-600"
            }`}>{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.technologies.map((tech, idx) => (
                <div 
                  key={idx} 
                  className={`p-1.5 px-3 rounded-full ${
                    theme === "dark" 
                      ? "bg-[var(--primary)]/20 text-[var(--primary)]/90" 
                      : "bg-[var(--accent)]/10 text-[var(--accent)]/90"
                  }`}
                >
                  <span className="text-xs font-medium">{tech}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-800/10 dark:border-white/10">
              <div className={`inline-flex items-center text-sm font-medium ${
                theme === "dark" ? "text-[var(--accent)]" : "text-[var(--primary)]"
              }`}>
                View Project
                <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </PinContainer>
    </motion.div>
  );
} 