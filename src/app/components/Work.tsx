"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface EducationProps {
  degree: string;
  institution: string;
  logo: string;
  description: string;
  preview?: string;
}

const EducationItem: React.FC<EducationProps> = ({
  degree,
  institution,
  logo,
  description,
  preview = "/default.png",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex items-start">
        <div className="w-10 h-10 mr-4 flex-shrink-0">
          <Image
            src={logo}
            alt={`${institution} logo`}
            width={40}
            height={40}
            className="w-full h-full rounded-full object-cover border border-[var(--border)]"
          />
        </div>

        <div>
          <span className="relative inline-block">
            <div
              className="text-base text-[var(--foreground)] font-semibold"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {degree} @ {institution}
            </div>

            {isHovered && preview && (
              <div className="absolute z-10 left-full ml-4 top-0 w-72 p-2 shadow-lg bg-[var(--tooltip)] border border-[var(--tooltip-border)] rounded text-sm text-[var(--tooltip-foreground)]">
                <div className="w-full h-40 overflow-hidden rounded mb-2">
                  <Image
                    src={preview}
                    alt={`${institution} preview`}
                    width={288}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs">{description}</p>
                <div className="absolute top-3 -left-2 w-4 h-4 bg-[var(--tooltip)] border-l border-b border-[var(--tooltip-border)] transform rotate-45"></div>
              </div>
            )}
          </span>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const educationData = [
  {
    degree: "MSc Business Management (GPA 3.80 / 4.0)",
    institution: "University of East Anglia, Norwich, UK",
    logo: "/companies/ucp.png",
    description: "Focused on project management, marketing and leadership in a global business context.",
    preview: "/companies/ucp.png",
  },
  {
    degree: "BSc Industrial Engineering (GPA 3.17 / 4.0)",
    institution: "Kadir Has University, Istanbul, Turkey",
    logo: "/companies/khas.png",
    description: "Graduated with honors. Academic Publication on Decision-making Algortihms.  Relevant coursework: operations research, data analysis.",
    preview: "/companies/khas.png",
  },
  {
    degree: "International Baccalaureate (IB)",
    institution: "Bahceselir High School, Istanbul, Turkey",
    logo: "/companies/bk.png",
    description: "Graduated with honors. Academic Publication on Decision-making Algortihms.  Relevant coursework: operations research, data analysis.",
    preview: "/companies/bk.png",
  },
  {
    degree: "Extracurricular Activities",
    institution: "hasmun.org",
    logo: "/companies/hasmun.jpeg",
    description: "Organized international Model UN events, led committees, mentored student delegates.",
    preview: "/companies/hasmun.jpeg",
  }
];

const preloadMedia = (preview: string) => {
  const img = new Image();
  img.src = preview;
};

const Education: React.FC = () => {
  useEffect(() => {
    educationData.forEach(({ preview }) => preloadMedia(preview || ""));
  }, []);

  return (
    <div className="py-8 px-4" id="education">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
        education
      </h1>
      <div className="max-w-2xl">
        {educationData.map((edu, index) => (
          <EducationItem
            key={index}
            degree={edu.degree}
            institution={edu.institution}
            logo={edu.logo}
            description={edu.description}
            preview={edu.preview}
          />
        ))}
      </div>
    </div>
  );
};

export default Education;
