"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image"; // ✅ Eklendi

interface PolaroidProps {
  image: string;
  description: string;
  alt: string;
}

const Polaroid: React.FC<PolaroidProps> = ({ image, description, alt }) => (
  <div className="polaroid-card min-w-[200px] sm:min-w-80 bg-white p-2 sm:p-4 pb-4 sm:pb-6 shadow-xl m-2 sm:m-4 transition-transform duration-300 hover:-rotate-2 hover:scale-105 relative before:absolute before:inset-0 before:shadow-md before:content-[''] before:z-[-1]">
    <div className="mb-2 sm:mb-4 h-48 sm:h-80 overflow-hidden relative">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        loading="lazy"
      />
    </div>
    <div className="polaroid-text text-xs sm:text-sm text-black p-1 sm:p-2 text-center">
      {description}
    </div>
  </div>
);

const Moments: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: false });

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const setRefs = (node: HTMLDivElement | null) => {
    scrollRef.current = node;
    if (typeof inViewRef === "function") {
      inViewRef(node);
    }
  };

  const polaroids = [
    {
      image: "/moments/IMG_7395.JPG",
      description: "HASMUN'22 Secretary General speech",
      alt: "HASMUN'22",
    },
    {
      image: "/moments/IMG_2262.jpeg",
      description: "Decision-maker Optimisation Engineering Project ",
      alt: "Publication",
    },
    {
      image: "/moments/NKN_8871.JPG",
      description: "HASMUN'23 Secretary General speech",
      alt: "el-Presidente",
    },
    {
      image: "/moments/5D36DA11-A706-4E66-B608-9F8F843753F4_1_105_c.jpeg",
      description: "DHL Global Forwarding Istanbul Family",
      alt: "Workshop group photo",
    },
    {
      image: "/moments/B15E95A6-61C8-49EC-8655-980ADC53CA67_1_105_c.jpeg",
      description: "HASMUN'23 Party",
      alt: "Party moment",
    },
    {
      image: "/moments/EC48FE0F-845A-4069-A5C9-F39B866B4D11_1_105_c.jpeg",
      description: "Alvaro Rodriguez, Turkey's UN Ambassador",
      alt: "HASMUN Visit",
    },
    {
      image: "/moments/B0DC0BBE-A3B6-4E8E-BACE-A0CCAE2B3AC9_1_105_c.jpeg",
      description: "SynctheCITY Event Business",
      alt: "United Kingdom",
    },
    {
      image: "/moments/AC87BCDB-36ED-478F-962F-F927B45C77D0_1_105_c.jpeg",
      description: "SEMT BIZIM EV KIRA",
      alt: "Evening break",
    },
    {
      image: "/moments/9F7C0010-B923-43B9-B95E-D31214C4247A_1_105_c.jpeg",
      description: "Minuteman Press Norwich",
      alt: "Dinner networking",
    },
    {
      image: "/moments/710684A1-65B2-469E-A076-F172807FD4DE_1_105_c.jpeg",
      description: "HASMUN'23",
      alt: "HASMUN Fam",
    },
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let lastTimestamp = 0;
    let scrollPos = 0;
    const scrollSpeed = 1.5;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const scroll = (timestamp: number) => {
      if (!scrollContainer || !inView || isDragging) return;
      if (timestamp - lastTimestamp > 20) { // optimize
        lastTimestamp = timestamp;
        scrollPos += scrollSpeed;
        if (scrollPos >= maxScroll) scrollPos = 0;
        scrollContainer.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(scroll);
    };

    if (inView) animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [inView, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  });

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)] px-4">moments</h1>
      <div className="max-w-2xl px-4">
        <p className="mb-6 text-base text-[var(--foreground)]">
          A visual snapshot of the journey — team wins, solo moments, stage talks, and more.
        </p>
      </div>

      <div className="relative w-full overflow-x-hidden overflow-y-visible">
        <div
          ref={setRefs}
          className="flex cursor-grab carousel overflow-x-auto scrollbar-hide !overflow-y-visible py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={handleMouseDown}
        >
          {polaroids.map((polaroid, index) => (
            <Polaroid
              key={index}
              image={polaroid.image}
              description={polaroid.description}
              alt={polaroid.alt}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Moments;
