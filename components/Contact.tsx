"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import GridBackground from "@/components/ui/grid-background";
import { useTheme } from "@/contexts/ThemeContext";
import { Spotlight } from "@/components/ui/spotlight";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { theme } = useTheme();
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormState("loading");

    // Simulate API call
    try {
      // Replace with actual API call to your email service
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success!
      setFormState("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset form state after 5 seconds
      setTimeout(() => {
        setFormState("idle");
      }, 5000);
    } catch (error) {
      setFormState("error");

      // Reset error state after 5 seconds
      setTimeout(() => {
        setFormState("idle");
      }, 5000);
    }
  };

  return (
    <section
      id="contact"
      className="relative section-padding overflow-hidden"
      ref={sectionRef}
    >
      {/* Using GridBackground for consistency with other sections */}
      <GridBackground className="absolute inset-0 dark:bg-neutral-900/80 bg-slate-100/80">
        {/* Empty for background effect */}
      </GridBackground>

      {/* Adding spotlights for visual interest */}
      <Spotlight
        className="right-0 top-20 md:right-40"
        fill={theme === "dark" ? "var(--accent)" : "var(--primary)"}
      />

      <Spotlight
        className="left-0 bottom-20 md:left-[10%]"
        fill={theme === "dark" ? "var(--primary)" : "var(--secondary)"}
      />

      <div className="container-width relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-transparent bg-clip-text">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-[var(--accent)] mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-[var(--foreground)]/80">
            Have a project in mind or want to discuss a potential collaboration?
            I'd love to hear from you. Fill out the form below and I'll get back
            to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
              <p className="text-[var(--foreground)]/80 mb-6">
                Feel free to reach out through the contact form or connect with
                me directly using the information below.
              </p>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[var(--primary)] p-3 rounded-full text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Email</h4>
                <a
                  href="mailto:hello@example.com"
                  className="text-[var(--accent)] hover:underline transition-all"
                >
                  lakinduperera458@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[var(--primary)] p-3 rounded-full text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Location</h4>
                <p>853- 1A , Ranawaka Road, Rukmale Road, Pannipitiya</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Social Profiles</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/lakindudev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-[var(--card-bg)] p-3 rounded-full hover:bg-[var(--accent)] hover:text-white transition-colors ${
                    theme === "dark" ? "text-white" : ""
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/lakindu-perera-297b752b2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-[var(--card-bg)] p-3 rounded-full hover:bg-[var(--accent)] hover:text-white transition-colors ${
                    theme === "dark" ? "text-white" : ""
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/lakindu_x/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-[var(--card-bg)] p-3 rounded-full hover:bg-[var(--accent)] hover:text-white transition-colors ${
                    theme === "dark" ? "text-white" : ""
                  }`}
                >
                  <svg 
                    className="h-5 w-5" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61555188457830"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-[var(--card-bg)] p-3 rounded-full hover:bg-[var(--accent)] hover:text-white transition-colors ${
                    theme === "dark" ? "text-white" : ""
                  }`}
                >
                  <svg 
                    className="h-5 w-5" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className={`card p-8 ${
                theme === "dark"
                  ? "bg-black/40 border-gray-800"
                  : "bg-white/80 border-gray-200"
              }`}
            >
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg ${
                    theme === "dark"
                      ? "bg-neutral-800"
                      : "bg-[var(--background)]"
                  } border ${
                    errors.name
                      ? "border-red-500"
                      : theme === "dark"
                      ? "border-gray-700"
                      : "border-[var(--card-border)]"
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg ${
                    theme === "dark"
                      ? "bg-neutral-800"
                      : "bg-[var(--background)]"
                  } border ${
                    errors.email
                      ? "border-red-500"
                      : theme === "dark"
                      ? "border-gray-700"
                      : "border-[var(--card-border)]"
                  }`}
                  placeholder="Your email"
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg ${
                    theme === "dark"
                      ? "bg-neutral-800"
                      : "bg-[var(--background)]"
                  } border ${
                    theme === "dark"
                      ? "border-gray-700"
                      : "border-[var(--card-border)]"
                  }`}
                  placeholder="Subject of your message"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg ${
                    theme === "dark"
                      ? "bg-neutral-800"
                      : "bg-[var(--background)]"
                  } border ${
                    errors.message
                      ? "border-red-500"
                      : theme === "dark"
                      ? "border-gray-700"
                      : "border-[var(--card-border)]"
                  }`}
                  placeholder="Your message"
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={formState === "loading"}
                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${
                  formState === "loading"
                    ? "bg-[var(--primary)]/70"
                    : "bg-[var(--primary)] hover:bg-[var(--primary)]/90"
                }`}
              >
                {formState === "loading" ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>

              {formState === "success" && (
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-300 rounded-lg">
                  Your message has been sent successfully! I'll get back to you
                  soon.
                </div>
              )}

              {formState === "error" && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-800/30 text-red-700 dark:text-red-300 rounded-lg">
                  There was an error sending your message. Please try again
                  later.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
