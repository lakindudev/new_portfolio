"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChatbot } from "@/contexts/ChatbotContext";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import ChatbotContactForm from "./ContactForm";

// Typing animation component
const TypingIndicator = () => (
  <div className="flex space-x-1 p-3 bg-[var(--card-bg)] rounded-lg inline-flex items-center justify-center w-auto">
    <motion.div
      animate={{ scale: [0.8, 1.2, 0.8] }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
      className="h-2 w-2 rounded-full bg-[var(--accent)]"
    />
    <motion.div
      animate={{ scale: [0.8, 1.2, 0.8] }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.2 }}
      className="h-2 w-2 rounded-full bg-[var(--accent)]"
    />
    <motion.div
      animate={{ scale: [0.8, 1.2, 0.8] }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.4 }}
      className="h-2 w-2 rounded-full bg-[var(--accent)]"
    />
  </div>
);

// Message Bubble component
const MessageBubble = ({ message }: { message: { id: string; type: string; text: string } }) => {
  const isBot = message.type === "bot";
  
// Handle links in text
const renderText = (text: string) => {
  const linkRegex = /\[(.+?)\]\((.+?)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add the link
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        className="text-[var(--accent)] hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {match[1]}
      </a>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length ? parts : text;
};


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "mb-3 max-w-[80%] rounded-2xl px-4 py-2",
        isBot
          ? "self-start rounded-bl-none bg-[var(--card-bg)] text-[var(--foreground)]"
          : "self-end rounded-br-none bg-[var(--accent)] text-white"
      )}
    >
      {renderText(message.text)}
    </motion.div>
  );
};

// Quick Reply Button component
const QuickReplyButton = ({ 
  text, 
  onClick 
}: { 
  text: string; 
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="px-4 py-2 bg-[var(--card-bg)] text-[var(--foreground)] rounded-full border border-[var(--card-border)] hover:bg-[var(--accent)] hover:text-white transition-colors duration-200"
  >
    {text}
  </motion.button>
);

// Main Chatbot Component
export default function Chatbot() {
  const { 
    isOpen, 
    messages, 
    typing,
    showContactForm,
    currentQuickReplies,
    toggleChat, 
    sendMessage, 
    handleQuickReply,
    toggleContactForm
  } = useChatbot();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, showContactForm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="fixed bottom-5 right-5 z-50 p-4 rounded-full bg-[var(--accent)] text-white shadow-lg"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-5 z-50 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-[var(--background)] border border-[var(--card-border)] rounded-2xl shadow-xl flex flex-col"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-[var(--card-border)] bg-[var(--card-bg)] rounded-t-2xl">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-lg font-bold">
                  L
                </div>
                <div>
                  <h3 className="font-bold">LakinduBot</h3>
                  <p className="text-sm text-[var(--foreground)]/70">Personal Assistant</p>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              
              {/* Contact Form */}
              <AnimatePresence>
                {showContactForm && (
                  <ChatbotContactForm onCancel={toggleContactForm} />
                )}
              </AnimatePresence>
              
              {typing && <TypingIndicator />}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Buttons */}
            <div className="p-3 border-t border-[var(--card-border)] flex flex-wrap gap-2 justify-center">
              {currentQuickReplies.map((reply) => (
                <QuickReplyButton
                  key={reply.id}
                  text={reply.text}
                  onClick={() => handleQuickReply(reply.action, reply.text)}
                />
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--card-border)]">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full p-3 pr-12 rounded-full bg-[var(--card-bg)] text-[var(--foreground)] border border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
                  disabled={!input.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 