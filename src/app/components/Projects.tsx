"use client";
import React, { useState, useEffect } from "react";

interface ExperienceProps {
  title: string;
  company: string;
  logo: string;
  description: string;
  preview?: string;
}

const ExperienceItem: React.FC<ExperienceProps> = ({
  title,
  company,
  logo,
  description,
  preview = "/default.png",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex items-start">
        <div className="w-10 h-10 mr-4 flex-shrink-0">
          <img
            src={logo}
            alt={`${company} logo`}
            className="w-full h-full rounded-full  object-cover border border-[var(--border)]"
          />
        </div>

        <div>
          <span className="relative inline-block">
            <div
              className="text-base text-[var(--foreground)] font-semibold"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {title} @ {company}
            </div>

            {isHovered && preview && (
              <div className="absolute z-10 left-full ml-4 top-0 w-72 p-2 shadow-lg bg-[var(--tooltip)] border border-[var(--tooltip-border)] rounded text-sm text-[var(--tooltip-foreground)]">
                <div className="w-full h-40 overflow-hidden rounded mb-2">
                  <img
                    src={preview}
                    alt={`${company} preview`}
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

const experiences = [
  {
    title: "Web Solutions Developer and SEO Analyst",
    company: "Minuteman Press Norwich",
    logo: "/projects/minuteman.png",
    description: "Led digital campaigns, increased and maintained high Traffic with SEO, Google Ads, and customer acquisition for a UK-based print agency.",
    preview: "/projects/minuteman.png",
  },
  {
    title: "Logistics Trainee",
    company: "DHL Supply Chain",
    logo: "/projects/dhl.png",
    description: "Worked on process optimization, warehouse operations and SAP integration for daily logistics flow.",
    preview: "/projects/dhl.png",
  },
  {
    title: "Sales & Business Development Intern",
    company: "ARK Pres",
    logo: "/projects/arkpres.png",
    description: "Supported the sales team in customer relations and reporting at an automotive manufacturer.",
    preview: "/projects/arkpres.png",
  },
  {title: "Teaching Assistant for Industial Engineering",
    company: "Kadir Has University",
    logo: "/projects/khas.png",
    description: "Assisted in teaching and grading for the Industrial Engineering department, focusing on operations research and optimization.",
    preview: "/projects/khas.png",
  },
  {
    title: "Manufacturing Planning Intern",
    company: "Uzer Makina",
    logo: "/projects/uzer.png",
    description: "Planning internship at Uzer Makina, focused on production planning and inventory management.",
    preview: "/projects/uzer.png",
  },
];

const preloadMedia = (preview: string) => {
  const img = new Image();
  img.src = preview;
};

const Experience: React.FC = () => {
  useEffect(() => {
    experiences.forEach(({ preview }) => preloadMedia(preview || ""));
  }, []);

  return (
    <div className="py-8 px-4" id="work">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
        work experience
      </h1>
      <div className="max-w-2xl">
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={index}
            title={exp.title}
            company={exp.company}
            logo={exp.logo}
            description={exp.description}
            preview={exp.preview}
          />
        ))}
      </div>
    </div>
  );
};

export default Experience;
