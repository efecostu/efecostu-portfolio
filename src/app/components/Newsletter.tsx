"use client";
import React, { useState } from "react";

const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your newsletter service
    console.log("Email submitted:", email);
    setIsSubmitted(true);
    setEmail("");

    // Reset the submission status after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="py-20 px-4 flex flex-col items-center justify-center text-center">
      {/* Stylized "much love" text */}
      <div className="relative w-full max-w-3xl mx-auto mb-10">
        <div className="overflow-hidden">
          <img src="/heading.png" alt="Love" className=" w-2/3 mx-auto" />
        </div>
      </div>

      {/* Newsletter signup */}
      <div className="w-full max-w-md">
        <p className="text-base mb-6 text-[var(--foreground)]">
          Want to stay updated? Subscribe to my newsletter
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-grow px-4 py-2  rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--muted-foreground)]"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-md hover:opacity-90 transition-opacity"
          >
            Subscribe
          </button>
        </form>

        {isSubmitted && (
          <p className="mt-2 text-green-500 text-sm">Thanks for subscribing!</p>
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
