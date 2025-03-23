"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

export const PinContainer = ({
  children,
  title,
  href,
  className = "",
  containerClassName = "",
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const { theme } = useTheme();
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  
  const onMouseLeave = () => {
    setIsHovered(false);
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <Link
      className={cn(
        "relative group/pin z-50 cursor-pointer",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={href || "/"}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          style={{
            transform: transform,
          }}
          transition={{ 
            duration: 0.7, 
            ease: [0.33, 1, 0.68, 1],
            type: "spring",
            damping: 20,
            stiffness: 100
          }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-black border border-white/[0.1] group-hover/pin:border-white/[0.2] overflow-hidden"
        >
          <div className={cn("relative z-50", className)}>{children}</div>
        </motion.div>
      </div>
      <PinPerspective title={title} href={href} isHovered={isHovered} />
    </Link>
  );
};

export const PinPerspective = ({
  title,
  href,
  isHovered,
}: {
  title?: string;
  href?: string;
  isHovered: boolean;
}) => {
  const { theme } = useTheme();
  
  return (
    <motion.div 
      className="pointer-events-none w-96 h-80 flex items-center justify-center z-[60] transition duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="w-full h-full -mt-7 flex-none inset-0">
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ 
              y: isHovered ? 0 : -10, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ 
              duration: 0.3, 
              delay: isHovered ? 0.1 : 0,
              ease: "easeOut"
            }}
            className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10"
          >
            <span className="relative z-20 text-white text-xs font-bold inline-block py-0.5">
              {title}
            </span>

            <motion.span 
              className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.8 : 0 }}
              transition={{ duration: 0.5, delay: isHovered ? 0.2 : 0 }}
            ></motion.span>
          </motion.div>
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
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isHovered ? [0, 1, 0.5, 0] : 0,
                scale: isHovered ? 1 : 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] -translate-x-1/2 -translate-y-1/2"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isHovered ? [0, 1, 0.5, 0] : 0,
                scale: isHovered ? 1 : 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] -translate-x-1/2 -translate-y-1/2"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isHovered ? [0, 1, 0.5, 0] : 0,
                scale: isHovered ? 1 : 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] -translate-x-1/2 -translate-y-1/2"
            ></motion.div>
          </>
        </div>

        <>
          <motion.div 
            className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px blur-[2px]"
            initial={{ height: "20px" }}
            animate={{ height: isHovered ? "160px" : "20px" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px"
            initial={{ height: "20px" }}
            animate={{ height: isHovered ? "160px" : "20px" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: isHovered ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: isHovered ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          />
        </>
      </div>
    </motion.div>
  );
}; 