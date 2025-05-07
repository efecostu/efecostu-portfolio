"use client";

import { useState } from "react";

export default function ContactForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setMessage("");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-[var(--background)] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Contact Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            className="w-full h-32 p-3 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)] text-[var(--foreground)]"
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-2 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
        {status === "success" && (
          <p className="text-green-600 text-center">Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
        )}
      </form>
    </div>
  );
} 