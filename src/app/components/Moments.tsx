"use client";
import React, { useEffect, useRef } from "react";

interface PolaroidProps {
  image: string;
  description: string;
  alt: string;
}

const Polaroid: React.FC<PolaroidProps> = ({ image, description, alt }) => {
  return (
    <div className="polaroid-card min-w-80 bg-white p-4 pb-6 shadow-xl m-4 transition-transform duration-300 hover:-rotate-2 hover:scale-105 relative before:absolute before:inset-0 before:shadow-md before:content-[''] before:z-[-1]">
      <div className="mb-4 h-80 overflow-hidden">
        <img src={image} alt={alt} className="w-full h-full object-cover" />
      </div>
      <div className="polaroid-text text-sm text-black p-2 text-center">
        {description}
      </div>
    </div>
  );
};

const Moments: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const polaroids = [
    {
      image: "/moments/appwrite-community.jpeg",
      description: "Appwrite Delhi community",
      alt: "Appwrite community",
    },
    {
      image: "/moments/avocado-speaker.jpeg",
      description: "Avo Connect Delhi",
      alt: "Avocado speaker",
    },
    {
      image: "/moments/dinner.png",
      description: "Team Dinner",
      alt: "Avocado speaker",
    },
    {
      image: "/moments/breakpoint.jpeg",
      description: "Solana Breakpoint - Singapore 2024",
      alt: "Solana Breakpoint",
    },

    {
      image: "/moments/delhi-meetup.jpeg",
      description: "Delhi Tech Meetup 2024",
      alt: "Delhi Tech Meetup",
    },
    {
      image: "/moments/appwrite-coop.png",
      description: "Appwrite Team❤️",
      alt: "Appwrite Team",
    },
    {
      image: "/moments/avocado-laptop.jpeg",
      description: "Avocado Connect - Bennett University",
      alt: "Delhi Tech Meetup",
    },

    {
      image: "/moments/first-time-speaker.jpeg",
      description: "Appwrite Developer Meetup - Delhi",
      alt: "First time speaking",
    },
    {
      image: "/moments/s5-graduate.jpeg",
      description: "Graduated from Buildspace",
      alt: "Buildspace graduation",
    },
    {
      image: "/moments/shefi.jpeg",
      description: "Shefi - Women in Crypto",
      alt: "SHEfi community",
    },
  ];

  // Auto-scrolling effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPos = 0;

    const scroll = () => {
      if (!scrollContainer) return;

      scrollPos += 1.5; // Adjust speed here

      // Reset position to create infinite scroll effect
      if (scrollPos >= scrollContainer.scrollWidth / 2) {
        scrollPos = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = scrollPos;
      }

      animationId = requestAnimationFrame(scroll);
    };

    scroll();

    // Pause scrolling when hovering
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)] px-4">
        moments
      </h1>
      <div className="max-w-2xl px-4">
        <p className="mb-6 text-base text-[var(--foreground)]">
          Tbh I&apos;m still figuring it out. Here&apos;s a small glimpse of my
          journey so far.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex carousel overflow-x-auto scrollbar-hide py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Double the polaroids to create seamless loop */}
          {[...polaroids, ...polaroids].map((polaroid, index) => (
            <Polaroid
              key={index}
              image={polaroid.image}
              description={polaroid.description}
              alt={polaroid.alt}
            />
          ))}
        </div>
      </div>

      {/* Add this style to hide scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Moments;
