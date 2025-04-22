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
    title: "Marketing & Sales",
    company: "Minuteman Press Norwich",
    logo: "/companies/minuteman.png",
    description: "Led digital campaigns, Google Ads, and customer acquisition for a UK-based print agency.",
    preview: "/companies/minuteman-preview.jpg",
  },
  {
    title: "Logistics Trainee",
    company: "DHL Supply Chain",
    logo: "/companies/dhl.png",
    description: "Worked on process optimization, warehouse operations and SAP integration for daily logistics flow.",
    preview: "/companies/dhl-preview.jpg",
  },
  {
    title: "Business Development Intern",
    company: "ARK Pres",
    logo: "/companies/arkpres.png",
    description: "Supported the sales team in customer relations and reporting at an automotive manufacturer.",
    preview: "/companies/arkpres-preview.jpg",
  },
  {
    title: "Data Analyst Intern",
    company: "Uzer Makina",
    logo: "/companies/uzer.png",
    description: "Created dashboards and reports for predictive maintenance & vibration analysis.",
    preview: "/companies/uzer-preview.jpg",
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
