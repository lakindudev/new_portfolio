"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// Define types
type MessageType = "bot" | "user";

interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
}

interface QuickReply {
  id: string;
  text: string;
  action: string;
}

interface ChatbotContextType {
  isOpen: boolean;
  messages: Message[];
  userName: string | null;
  typing: boolean;
  showContactForm: boolean;
  currentQuickReplies: QuickReply[];
  toggleChat: () => void;
  sendMessage: (text: string) => void;
  handleQuickReply: (action: string, text: string) => void;
  setUserName: (name: string) => void;
  toggleContactForm: () => void;
}

// Predefined chatbot responses
const BOT_RESPONSES = {
  welcome: [
    "Hi! I'm LakinduBot! 🚀",
    "I can help you navigate Lakindu's portfolio. What would you like to know?",
  ],
  projects: "Great! What kind of projects are you interested in?",
  reactProjects: "Lakindu has worked on several React projects. Check out the Projects section for more details!",
  skills: "Lakindu is skilled in React, Next.js, TypeScript, TailwindCSS, and more. Anything specific you want to know?",
  contact: "You can reach Lakindu through the contact form, or would you like to leave a message here?",
  resume: "You can download Lakindu's resume. Would you like me to provide a link?",
  thanks: "You're welcome! Anything else I can help with?",
  unknown: "I'm not sure I understand. Try asking about projects, skills, or how to contact Lakindu.",
  nameResponse: "Nice to meet you, {{name}}! How can I help you today?",
  contactFormIntro: "Sure! Please fill out the contact form below:",
  frontendSkills: "Lakindu's frontend skills include React, Next.js, TypeScript, JavaScript, HTML, CSS, TailwindCSS, and more! 🚀",
  backendSkills: "Lakindu has experience with Node.js, Express, MongoDB, and other backend technologies.",
  allProjects: "Lakindu has worked on various projects including web applications, mobile apps, and more. Check out the Projects section for the full portfolio!",
};

// Quick reply options
const QUICK_REPLIES = {
  main: [
    { id: "projects", text: "View Projects", action: "projects" },
    { id: "skills", text: "See Skills", action: "skills" },
    { id: "resume", text: "Download Resume", action: "resume" },
    { id: "contact", text: "Contact", action: "contact" },
  ],
  projects: [
    { id: "react", text: "React Apps", action: "reactProjects" },
    { id: "all", text: "All Projects", action: "allProjects" },
    { id: "back", text: "Go Back", action: "main" },
  ],
  skills: [
    { id: "frontend", text: "Frontend", action: "frontendSkills" },
    { id: "backend", text: "Backend", action: "backendSkills" },
    { id: "back", text: "Go Back", action: "main" },
  ],
  contact: [
    { id: "form", text: "Contact Form", action: "contactForm" },
    { id: "back", text: "Go Back", action: "main" },
  ],
};

// Create context
const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [currentQuickReplies, setCurrentQuickReplies] = useState<QuickReply[]>(QUICK_REPLIES.main);

  // Initialize chatbot with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessages = BOT_RESPONSES.welcome.map((text, index) => ({
        id: `welcome-${index}`,
        type: "bot" as MessageType,
        text,
        timestamp: new Date(),
      }));
      
      // Simulate typing for welcome messages
      const addWelcomeMessages = async () => {
        setTyping(true);
        
        // Add first message immediately
        setMessages([welcomeMessages[0]]);
        
        // Wait and add second message
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setMessages([welcomeMessages[0], welcomeMessages[1]]);
        
        setTyping(false);
      };
      
      addWelcomeMessages();
    }
  }, [messages.length]);

  // Toggle chat open/closed
  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Toggle contact form visibility
  const toggleContactForm = useCallback(() => {
    setShowContactForm((prev) => !prev);
  }, []);

  // Send a message as the user
  const sendMessage = useCallback((text: string) => {
    // Create user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      text,
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);

    // Process user message to determine response
    processMessage(text);
  }, []);

  // Process user message and generate bot response
  const processMessage = useCallback((text: string) => {
    setTyping(true);
    setShowContactForm(false);

    // Check for name introduction
    const nameMatch = text.match(/my name is (\w+)/i) || text.match(/i('m| am) (\w+)/i);
    if (nameMatch) {
      const name = nameMatch[1] || nameMatch[2];
      setUserName(name);
      
      setTimeout(() => {
        const response = BOT_RESPONSES.nameResponse.replace("{{name}}", name);
        addBotMessage(response);
        setTyping(false);
      }, 1000);
      return;
    }

    // Process based on keywords
    setTimeout(() => {
      let responseText = BOT_RESPONSES.unknown;
      let newQuickReplies = currentQuickReplies;

      // Simple keyword matching
      const lowerText = text.toLowerCase();
      if (lowerText.includes("project") || lowerText.includes("work")) {
        responseText = BOT_RESPONSES.projects;
        newQuickReplies = QUICK_REPLIES.projects;
      } else if (lowerText.includes("skill") || lowerText.includes("know") || lowerText.includes("technology")) {
        responseText = BOT_RESPONSES.skills;
        newQuickReplies = QUICK_REPLIES.skills;
      } else if (lowerText.includes("contact") || lowerText.includes("email") || lowerText.includes("reach") || lowerText.includes("message")) {
        responseText = BOT_RESPONSES.contact;
        newQuickReplies = QUICK_REPLIES.contact;
      } else if (lowerText.includes("resume") || lowerText.includes("cv")) {
        responseText = BOT_RESPONSES.resume;
      } else if (lowerText.includes("thank")) {
        responseText = BOT_RESPONSES.thanks;
      }

      addBotMessage(responseText);
      setCurrentQuickReplies(newQuickReplies);
      setTyping(false);
    }, 1000 + Math.random() * 500); // Random delay to seem more natural
  }, [currentQuickReplies]);

  // Handle quick reply button clicks
  const handleQuickReply = useCallback((action: string, text: string) => {
    // Add user message based on button click
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      text,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setTyping(true);
    setShowContactForm(false);

    // Handle different actions
    setTimeout(() => {
      let responseText = "";
      let newQuickReplies = currentQuickReplies;
      let shouldShowContactForm = false;

      switch (action) {
        case "main":
          responseText = BOT_RESPONSES.welcome[1];
          newQuickReplies = QUICK_REPLIES.main;
          break;
        case "projects":
          responseText = BOT_RESPONSES.projects;
          newQuickReplies = QUICK_REPLIES.projects;
          break;
        case "reactProjects":
          responseText = BOT_RESPONSES.reactProjects;
          break;
        case "allProjects":
          responseText = BOT_RESPONSES.allProjects;
          break;
        case "skills":
          responseText = BOT_RESPONSES.skills;
          newQuickReplies = QUICK_REPLIES.skills;
          break;
        case "frontendSkills":
          responseText = BOT_RESPONSES.frontendSkills;
          break;
        case "backendSkills":
          responseText = BOT_RESPONSES.backendSkills;
          break;
        case "resume":
          responseText = "You can download Lakindu's resume here: [Resume Link](/lakindu_cv.pdf)";
          break;
        case "contact":
          responseText = BOT_RESPONSES.contact;
          newQuickReplies = QUICK_REPLIES.contact;
          break;
        case "contactForm":
          responseText = BOT_RESPONSES.contactFormIntro;
          shouldShowContactForm = true;
          break;
        default:
          responseText = BOT_RESPONSES.unknown;
      }

      addBotMessage(responseText);
      setCurrentQuickReplies(newQuickReplies);
      setTyping(false);
      
      // Show contact form after a short delay if requested
      if (shouldShowContactForm) {
        setTimeout(() => {
          setShowContactForm(true);
        }, 500);
      }
    }, 1000);
  }, [currentQuickReplies]);

  // Helper to add a bot message
  const addBotMessage = useCallback((text: string) => {
    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      type: "bot",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  }, []);

  // Context value
  const value = {
    isOpen,
    messages,
    userName,
    typing,
    showContactForm,
    currentQuickReplies,
    toggleChat,
    sendMessage,
    handleQuickReply,
    setUserName,
    toggleContactForm,
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
} 