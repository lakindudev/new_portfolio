"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface Skill {
  name: string;
  percentage: number;
  color: string;
  icon: React.ReactNode;
}

const skills: Skill[] = [
  {
    name: "React",
    percentage: 90,
    color: "#61DAFB",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" fill="currentColor" />
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25C11.8919 2.25 11.7841 2.25718 11.6767 2.27144C8.69616 2.76382 6.5 5.32961 6.5 8.5C6.5 9.05691 6.55252 9.55148 6.6875 10.0466C4.82506 11.0089 3.5 12.8875 3.5 15C3.5 18.0376 6.01472 20.5 9 20.5C9.55691 20.5 10.0515 20.4475 10.5466 20.3125C11.0089 22.1749 12.8875 23.5 15 23.5C17.7614 23.5 20 21.2614 20 18.5C20 16.3875 18.6749 14.5089 16.8125 13.5466C16.9475 13.0515 17 12.5569 17 12C17 10.3644 16.0354 8.93201 14.6234 8.17905C14.8273 7.64068 15 7.08525 15 6.5C15 4.15279 13.2086 2.25 12 2.25ZM12 3.75C12.2221 3.75 13.5 4.34721 13.5 6.5C13.5 6.73596 13.4417 6.96659 13.3599 7.19477C12.9308 7.06981 12.4747 7 12 7C11.3498 7 10.7362 7.13781 10.188 7.38927C10.0663 7.11826 10 6.81855 10 6.5C10 5.80777 10.293 5.125 10.793 4.625C11.293 4.125 11.8889 3.75 12 3.75ZM8 8.5C8 6.09482 9.67496 4.13862 11.8727 3.78029C11.2857 4.488 11 5.46332 11 6.5C11 6.72827 11.0148 6.95339 11.044 7.17435C10.0873 7.58209 9.30998 8.33908 8.85521 9.27324C8.31629 9.08457 8 8.82843 8 8.5ZM12 8.5C13.6569 8.5 15 9.84315 15 11.5C15 11.7827 14.9682 12.0534 14.9088 12.3112C14.2776 12.1064 13.6018 12 12.9 12C12.5922 12 12.2923 12.0232 12.0026 12.0676C11.6681 10.8962 10.8957 9.88739 9.85547 9.22746C10.4646 8.76228 11.2 8.5 12 8.5ZM8 15C8 13.4023 9.08573 12.0307 10.5553 11.5576C10.195 12.3028 10 13.1299 10 14C10 14.5989 10.0867 15.1744 10.2476 15.7149C9.55465 15.9041 8.79085 16 8 16C7.93098 16 7.86274 15.9982 7.79538 15.9948C7.92459 15.6695 8 15.3423 8 15ZM12.9 13.5C14.9869 13.5 16.5 15.0131 16.5 17.1C16.5 17.309 16.4793 17.5035 16.4396 17.6914C16.0913 17.7632 15.7286 17.8 15.353 17.8C14.0676 17.8 12.9089 17.3205 12.0675 16.5488C11.9939 15.7139 11.8349 14.9143 11.6067 14.1568C11.9627 13.7436 12.4038 13.5 12.9 13.5ZM9 19C7.59554 19 6.3318 18.2049 5.68546 17.1045C6.40416 17.0351 7.09669 16.9003 7.7551 16.7049C8.14788 17.1741 8.62134 17.5555 9.14823 17.9527C9.10151 18.293 9 18.6396 9 19ZM15 22C13.2131 22 11.7427 20.7542 11.3265 19.0909C11.7054 18.7502 12.0648 18.3798 12.3784 17.9891C12.9977 18.4442 13.7205 18.7732 14.513 18.9339C14.1766 20.6339 13.3644 22 12 22C11.9776 22 11.9553 21.9997 11.9333 21.9992C12.6413 21.913 13.1891 21.2738 13.5 20.5C13.8986 20.8273 14.4272 21 15 21C15.3187 21 15.6156 20.9334 15.8805 20.8137C15.4565 21.5219 14.7755 22 14 22H15Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    percentage: 85,
    color: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M11.5725 0C5.1775 0 0 5.1775 0 11.5725C0 17.9675 5.1775 23.145 11.5725 23.145C13.3225 23.145 14.9775 22.7325 16.4325 22.005L7.4775 10.605V16.38H6.1125V8.0025H7.4775L17.7075 21.105C21.0225 19.1775 23.145 15.645 23.145 11.5725C23.145 5.1775 17.9675 0 11.5725 0ZM16.38 15.405L14.9325 13.485V8.0025H16.38V15.405Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    percentage: 80,
    color: "#3178C6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M1.125 0C0.502 0 0 0.502 0 1.125V22.875C0 23.498 0.502 24 1.125 24H22.875C23.498 24 24 23.498 24 22.875V1.125C24 0.502 23.498 0 22.875 0H1.125ZM18.375 12.375V13.875C18.9976 13.875 19.5 14.3774 19.5 15C19.5 15.6226 18.9976 16.125 18.375 16.125V18C19.8247 18 21 16.8247 21 15.375V12.375H18.375ZM3.75 12.375V13.5H6V19.5H8.25V13.5H10.5V12.375H3.75ZM14.25 12.375V13.5C15.0784 13.5 15.75 14.1716 15.75 15V16.875C15.75 17.7034 15.0784 18.375 14.25 18.375C13.4216 18.375 12.75 17.7034 12.75 16.875V15C12.75 13.7573 11.7427 12.75 10.5 12.75V18.375C10.5 19.8247 12.1753 21 13.625 21C15.0747 21 16.75 19.8247 16.75 18.375V15.75C16.75 14.3003 15.6747 12.375 14.25 12.375Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Java",
    percentage: 75,
    color: "#007396",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M8.851 7.56C8.851 7.56 7.473 8.334 9.086 8.594C11.021 8.886 12.034 8.854 13.561 8.562C13.561 8.562 14.059 8.865 14.731 9.12C11.332 10.58 7.016 8.777 8.851 7.56ZM8.249 10.341C8.249 10.341 6.783 11.32 8.394 11.562C10.485 11.872 12.284 11.897 14.472 11.481C14.472 11.481 14.828 11.831 15.347 11.999C11.158 13.206 6.469 11.891 8.249 10.341Z" fill="currentColor" />
        <path d="M10.855 3.81C11.937 5.076 10.585 6.254 10.585 6.254C10.585 6.254 12.283 5.236 11.426 3.94C10.635 2.743 9.939 2.152 14.122 0C14.122 0 8.14 1.196 10.855 3.81Z" fill="currentColor" />
        <path d="M16.911 12.474C16.911 12.474 17.959 13.256 16.595 13.936C14.13 15.146 6.669 15.311 4.525 13.952C3.778 13.466 5.305 12.747 5.791 12.61C6.299 12.466 6.619 12.496 6.619 12.496C5.791 11.886 1.783 13.214 3.638 14.015C9.398 16.191 16.389 14.059 16.911 12.474Z" fill="currentColor" />
        <path d="M9.195 13.181C9.195 13.181 5.323 14.044 7.411 14.745C8.414 15.074 10.348 15.034 12.125 14.87C13.561 14.732 15.004 14.426 15.004 14.426C15.004 14.426 14.399 14.745 13.957 15.087C10.741 16.191 4.356 15.6 6.051 14.477C7.478 13.533 9.195 13.181 9.195 13.181Z" fill="currentColor" />
        <path d="M14.514 16.869C17.771 15.146 16.327 13.523 15.347 13.783C15.079 13.861 14.966 13.923 14.966 13.923C14.966 13.923 15.102 13.676 15.459 13.582C17.573 12.915 19.19 15.827 14.399 16.946C14.399 16.946 14.472 16.9 14.514 16.869Z" fill="currentColor" />
        <path d="M11.718 0.12C11.718 0.12 13.296 1.669 10.964 4.025C9.113 5.875 11.045 6.809 11.718 8.349C10.101 6.826 8.924 5.492 9.637 4.301C10.66 2.636 12.289 2.03 11.718 0.12Z" fill="currentColor" />
        <path d="M9.677 19.242C12.799 19.383 17.337 19.059 17.414 17.538C17.414 17.538 17.115 18.17 14.679 18.656C11.937 19.209 8.553 19.156 6.512 18.781C6.512 18.781 7.023 19.123 9.677 19.242Z" fill="currentColor" />
        <path d="M8.09 21.461C11.21 21.508 14.913 21.338 14.998 20.32C14.998 20.32 14.785 20.728 13.153 21.039C10.964 21.445 8.301 21.399 6.851 21.131C6.851 21.131 7.267 21.43 8.09 21.461Z" fill="currentColor" />
        <path d="M10.025 23.669C11.937 23.684 13.389 23.506 13.389 23.219C13.389 22.932 12.387 22.654 10.025 22.669C7.663 22.684 6.173 22.924 6.173 23.204C6.173 23.483 8.113 23.654 10.025 23.669Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Python",
    percentage: 78,
    color: "#3776AB",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M11.93 2C7.05 2 7.46 3.89 7.46 3.89L7.47 5.86H12V6.35H5.44C5.44 6.35 2 5.96 2 10.84C2 15.71 4.99 15.45 4.99 15.45H6.68V13.39C6.68 13.39 6.54 10.4 9.62 10.4H14.08C14.08 10.4 16.93 10.45 16.93 7.69V4.07C16.93 4.07 17.41 2 11.93 2ZM9.45 3.44C9.77 3.44 10.02 3.7 10.02 4.01C10.02 4.33 9.77 4.59 9.45 4.59C9.13 4.59 8.87 4.33 8.87 4.01C8.87 3.7 9.13 3.44 9.45 3.44Z" fill="currentColor" />
        <path d="M12.07 22C16.95 22 16.54 20.11 16.54 20.11L16.53 18.14H12V17.65H18.56C18.56 17.65 22 18.04 22 13.16C22 8.29 19.01 8.55 19.01 8.55H17.32V10.61C17.32 10.61 17.46 13.6 14.38 13.6H9.92C9.92 13.6 7.07 13.55 7.07 16.31V19.93C7.07 19.93 6.59 22 12.07 22ZM14.55 20.56C14.23 20.56 13.98 20.3 13.98 19.99C13.98 19.67 14.23 19.41 14.55 19.41C14.87 19.41 15.13 19.67 15.13 19.99C15.13 20.3 14.87 20.56 14.55 20.56Z" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  return (
    <section id="skills" className="section-padding" ref={sectionRef}>
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-[var(--accent)] mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-[var(--foreground)]/80">
            I've developed expertise in various technologies and programming languages,
            allowing me to build comprehensive solutions for diverse projects.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skills.map((skill, index) => (
            <SkillBar 
              key={skill.name} 
              skill={skill} 
              index={index} 
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <SkillCard 
            title="Frontend Development" 
            skills={["HTML5/CSS3", "JavaScript (ES6+)", "React.js", "Next.js", "Vue.js"]} 
          />
          <SkillCard 
            title="Backend Development" 
            skills={["Node.js", "Express", "Python/Django", "Java/Spring", "RESTful APIs"]} 
          />
          <SkillCard 
            title="Other Skills" 
            skills={["Git/GitHub", "Docker", "AWS", "Firebase", "CI/CD"]} 
          />
        </motion.div>
      </div>
    </section>
  );
}

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const barRef = useRef(null);
  const isInView = useInView(barRef, { once: true, amount: 0.5 });
  
  return (
    <motion.div
      ref={barRef}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="mr-2 text-[var(--accent)]">{skill.icon}</div>
          <h3 className="font-medium">{skill.name}</h3>
        </div>
        <span className="text-sm font-medium">{skill.percentage}%</span>
      </div>
      <div className="h-3 bg-[var(--card-bg)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color }}
        />
      </div>
    </motion.div>
  );
}

function SkillCard({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="card p-6">
      <h3 className="text-xl font-bold mb-4 text-[var(--accent)]">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li key={skill} className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
} 