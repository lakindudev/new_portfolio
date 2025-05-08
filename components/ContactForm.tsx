"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useChatbot } from "@/contexts/ChatbotContext";

interface ContactFormProps {
  onCancel: () => void;
}

export default function ChatbotContactForm({ onCancel }: ContactFormProps) {
  const { sendMessage } = useChatbot();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real application, you would send this data to your backend
    // For this demo, we'll simulate a successful submission
    setTimeout(() => {
      // Add user message confirming contact form submission
      sendMessage(`I'd like to get in touch! Name: ${formData.name}, Email: ${formData.email}, Message: ${formData.message}`);
      
      // Reset form and close it
      setFormData({ name: "", email: "", message: "" });
      setLoading(false);
      onCancel();
      
      // Simulate bot response after a delay
      setTimeout(() => {
        sendMessage("Thanks for your message! I'll get back to you soon.");
      }, 1000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="p-4 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] mb-4"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Quick Contact</h3>
        <button 
          onClick={onCancel}
          className="text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="w-full p-2 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            required
            className="w-full p-2 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            required
            rows={3}
            className="w-full p-2 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 text-sm border border-[var(--card-border)] rounded-lg hover:bg-[var(--background)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-3 py-1.5 text-sm bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent)]/90 transition-colors flex items-center space-x-1"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/20 border-t-white/100 rounded-full animate-spin"></span>
                <span>Sending...</span>
              </>
            ) : (
              <span>Send Message</span>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
} 