"use client";
import React, { useState } from "react";

interface LinkWithTooltipProps {
  href: string;
  text: string;
  description: string;
}

// Component for linky words with hover descriptions
const LinkWithTooltip: React.FC<LinkWithTooltipProps> = ({
  href,
  text,
  description,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span className="relative inline-block">
      <a
        href={href}
        className="text-[var(--muted-foreground)] text-sm underline cursor-pointer group flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text}
        <svg
          className="w-3 h-3 ml-0.5 inline-block"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>

      {isHovered && (
        <div className="absolute z-10 left-0 -bottom-24 w-64 p-3 shadow-lg bg-[var(--tooltip)] border border-[var(--tooltip-border)] rounded text-sm text-[var(--tooltip-foreground)]">
          {description}
          <div className="absolute -top-2 left-3 w-4 h-4 bg-[var(--tooltip)] border-t border-l border-[var(--tooltip-border)] transform rotate-45"></div>
        </div>
      )}
    </span>
  );
};

interface SocialLinkProps {
  href: string;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, label }) => {
  return (
    <a
      href={href}
      className="text-[var(--link)] text-sm hover:underline flex items-center"
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
      <svg
        className="w-3 h-3 ml-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
      </svg>
    </a>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="py-8 px-4 min-h-[70vh] flex flex-col items-start z-20">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
        hi, i am dakshi
      </h1>
      <div className="max-w-2xl">
        <p className="mb-4 text-base text-[var(--foreground)]">
          I&apos;m a developer currently working in sales for a{" "}
          <LinkWithTooltip
            href="#"
            text="beacon platform"
            description="A platform that uses beacon technology for proximity marketing and location-based services."
          />
          .
        </p>

        <p className="mb-4 text-base text-[var(--foreground)]">
          previously a software engineer at{" "}
          <LinkWithTooltip
            href="#"
            text="kmon"
            description="A company specializing in open source monitoring tools and solutions."
          />{" "}
          building an open source kafka cluster monitoring tool.
        </p>

        <p className="mb-4 text-base text-[var(--foreground)]">
          sometimes i write about crypto and ai on{" "}
          <LinkWithTooltip
            href="#"
            text="mirror"
            description="A decentralized publishing platform built on blockchain technology."
          />
          .
        </p>

        <p className="mb-4 text-base text-[var(--foreground)]">
          originally from{" "}
          <LinkWithTooltip
            href="#"
            text="india"
            description="A country in South Asia known for its diverse culture and technological innovation."
          />
          . currently in new york.
        </p>

        <p className="mb-4 text-base text-[var(--foreground)]">
          i&apos;m a fan of early morning runs,{" "}
          <LinkWithTooltip
            href="#"
            text="electronic music"
            description="A genre of music that employs electronic musical instruments and technology in its production."
          />
          , ping pong,{" "}
          <LinkWithTooltip
            href="#"
            text="allin pod"
            description="A popular podcast focusing on technology, startups, and investment strategies."
          />
          , steaks, nonfiction/business books about political
          science/sociology/economics.
        </p>
      </div>
      <div className="flex gap-5 mt-6 social-link">
        <SocialLink href="https://twitter.com/yourusername" label="X" />
        <SocialLink href="https://github.com/yourusername" label="GitHub" />
        <SocialLink
          href="https://linkedin.com/in/yourusername"
          label="LinkedIn"
        />
        <SocialLink href="https://yourusername.hashnode.dev" label="Blog" />
      </div>
    </div>
  );
};

export default Hero;
