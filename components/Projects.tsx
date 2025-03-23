"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

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
  const { theme } = useTheme();
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  return (
    <section id="projects" className="section-padding bg-[var(--card-bg)]/30 relative overflow-hidden" ref={sectionRef}>
      <Spotlight 
        className="-left-40 top-40" 
        fill={theme === "dark" ? "var(--accent)" : "var(--primary)"}
      />
      
      <div className="container-width relative z-10">
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
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === category 
                    ? "bg-[var(--accent)] text-white" 
                    : "bg-[var(--card-bg)] text-[var(--foreground)] hover:bg-[var(--card-bg)]/70"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ 
  project, 
  index
}: { 
  project: Project; 
  index: number;
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full h-full"
    >
      <PinContainer title={project.title} href={project.link} containerClassName="w-full h-[30rem]">
        <div className="flex flex-col w-full h-full bg-[var(--card-bg)] rounded-2xl overflow-hidden border border-white/[0.08]">
          <div className="relative w-full h-40">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col p-4 flex-grow">
            <h3 className="text-white text-lg font-medium mb-2">{project.title}</h3>
            <p className="text-white/70 text-sm mb-4 flex-grow">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.technologies.map((tech, idx) => (
                <div key={idx} className="bg-white/10 p-1.5 rounded-md">
                  <span className="text-xs text-white">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PinContainer>
    </motion.div>
  );
}

// 3D Pin Container Component
export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <div
      className={cn(
        "relative group/pin z-50 cursor-pointer",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden"
        >
          <div className={cn("relative z-50", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} href={href} />
    </div>
  );
};

export const PinPerspective = ({
  title,
  href,
}: {
  title?: string;
  href?: string;
}) => {
  return (
    <motion.div className="pointer-events-none w-full h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
      <div className="w-full h-full -mt-7 flex-none inset-0">
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <a
            href={href}
            target={"_blank"}
            className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10"
          >
            <span className="relative z-20 text-white text-xs font-bold inline-block py-0.5">
              {title}
            </span>

            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
          </a>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
          </>
        </div>

        <>
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40" />
          <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
          <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" />
        </>
      </div>
    </motion.div>
  );
}; 