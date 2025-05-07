"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface LinkWithTooltipProps {
  href?: string;
  text: string;
  description: React.ReactNode;
  imageUrl?: string;
}

const LinkWithTooltip: React.FC<LinkWithTooltipProps> = ({
  href,
  text,
  description,
  imageUrl,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsTooltipVisible(false);
    }, 100);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!href && window.innerWidth < 768) {
      e.preventDefault();
      setIsTooltipVisible(!isTooltipVisible);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsTooltipVisible(false);
      }
    };

    if (isTooltipVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isTooltipVisible]);

  return (
    <span ref={containerRef} className="relative inline-block">
      <a
        ref={linkRef}
        href={href}
        target={href ? "_blank" : undefined}
        className="text-[var(--muted-foreground)] text-[15px] decoration-[1px] underline underline-offset-3 decoration-[var(--muted-foreground)] cursor-pointer group inline-flex items-center"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onClick={handleClick}
      >
        {text}
        {href && (
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
        )}
      </a>

      {isTooltipVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-10 left-0 top-8 w-64 p-3 shadow-lg bg-[var(--tooltip)] border border-[var(--tooltip-border)] rounded text-sm text-[var(--tooltip-foreground)]"
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {imageUrl && (
            <div className="w-full h-40 overflow-hidden rounded mb-2">
              <Image
                src={imageUrl}
                alt="tooltip illustration"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="space-y-1">{description}</div>
          <span className="absolute -top-2 left-3 w-4 h-4 bg-[var(--tooltip)] border-t border-l border-[var(--tooltip-border)] transform rotate-45"></span>
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
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
        Hi, Efe Costu 👋
      </h1>
      <div className="max-w-2xl">
        <p className="mb-4 text-base text-[var(--foreground)]">
          Industrial Engineer & Business Manager with a passion for bridging engineering and business through smart digital solutions.
        </p>

        <p className="mb-8 text-base text-[var(--foreground)]">
          With a background in <LinkWithTooltip text="Industrial Engineering" description="Data analysis, supply chain management, SAP usage" /> and a master&apos;s in <LinkWithTooltip text="Business Management" description="Sales strategy, financial performance, project coordination" />, I&apos;ve supported operations in Turkey and the UK—optimizing logistics, developing predictive maintenance systems, and designing SEO-optimized websites.
        </p>

        <div className="my-8">
          <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
            EXPERTISE:
          </div>
          <p className="text-base text-[var(--foreground)]">
            Sales Engineering, Predictive Maintenance, SEO & Web Development, SAP
          </p>
        </div>

        <p className="mb-8 text-base text-[var(--foreground)]">
          I&apos;ve collaborated with DHL, SKF, and SMEs on both technical and strategic goals.
        </p>

        <p className="mb-8 text-base text-[var(--foreground)]">
          I&apos;m also a former student union president and active community builder in youth-led events and international summits.
        </p>
      </div>
      <div className="flex gap-5 mt-8">
        <SocialLink href="https://github.com/efecostu" label="GitHub" />
        <SocialLink href="https://www.linkedin.com/in/efecostu/" label="LinkedIn" />
        <SocialLink href="mailto:efe.costu@gmail.com" label="Email" />
      </div>
    </div>
  );
};

export default Hero;
