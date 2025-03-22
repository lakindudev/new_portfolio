"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import { PinContainer } from "./PinContainer";

export interface Project {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "LunaRest- sleep quality prediction platform",
    des: "LunaRest is a AI driven sleep quality prediction web application...",
    img: "/lunarest.png",
    iconLists: [
      "/re.svg",
      "/tail.svg",
      "/ts.svg",
      "/spring.svg",
      "/java.svg",
      "/py.svg",
    ],
    link: "/ui.apple.com",
  },
  {
    id: 2,
    title: "Real time Ticketing System",
    des: "This project is a Real-Time Event Ticketing System that utilizes the Producer-Consumer pattern to handle concurrent ticket releases and purchases efficiently.",
    img: "/ticketing.png",
    iconLists: ["/spring.svg", "/re.svg", "/java.svg", "/tail.svg", "/js.svg"],
    link: "/ui.earth.com",
  },
  {
    id: 3,
    title: "Estate Agent Project",
    des: "This is a responsive and interactive Web Application built with React.js, designed to function as an estate agent web platform. The application allows users to search for properties based on multiple criteria, view detailed property information, and save favorites for easy access—all without a server, using client-side storage.",
    img: "/estate.png",
    iconLists: ["/re.svg", "/tail.svg", "/js.svg"],
    link: "https://heroic-medovik-2b97c6.netlify.app/",
  },
  {
    id: 4,
    title: "Healthcare Management System",
    des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
    img: "/healthcare.png",
    iconLists: ["/re.svg", "/tail.svg", "/js.svg", "/three.svg", "/c.svg"],
    link: "/ui.aiimg.com",
  },
];

export default function ProjectPinCards() {
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  return (
    <section id="projects" className="section-padding" ref={sectionRef}>
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-[var(--accent)] mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-[var(--foreground)]/80 mb-8">
            Explore my latest projects showcasing my skills in web development,
            AI integration, and innovative solutions.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mt-24">
          {projects.map((project, index) => (
            <div key={project.id} className="mb-16 flex justify-center">
              <ProjectCard project={project} index={index} />
            </div>
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
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full h-full"
    >
      <PinContainer title={project.title} href={project.link} containerClassName="w-full h-[30rem]">
        <div className="flex flex-col w-[20rem] h-[25rem] bg-[var(--card-bg)] rounded-2xl overflow-hidden border border-white/[0.08]">
          <div className="relative w-full h-40">
            <Image
              src={project.img}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col p-4 flex-grow">
            <h3 className="text-white text-lg font-medium mb-2 line-clamp-1">{project.title}</h3>
            <p className="text-white/70 text-sm line-clamp-4 mb-4 flex-grow">{project.des}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.iconLists.map((icon, idx) => (
                <div key={idx} className="bg-white/10 p-1.5 rounded-md">
                  <Image
                    src={icon}
                    alt="Technology icon"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </PinContainer>
    </motion.div>
  );
} 