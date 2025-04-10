"use client";

import Header from "./components/Header";
import Hero from "./Hero";
import Card from "./components/Card";
import { ThemeProvider } from "./theme-provider";
import Projects from "./components/Projects";
import Work from "./components/Work";
import Moments from "./components/Moments";
import ComingSoon from "./components/Newsletter";

export default function Home() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
      <div className="min-h-screen p-0 font-[family-name:var(--font-geist-sans)]">
        {/* Card element positioned to overlay with content */}
        <div className="card-wrapper" style={{ height: "calc(100vh + 100px)" }}>
          <Card />
        </div>

        {/* Main content area */}
        <div className="relative">
          {/* Header with higher z-index to appear above card */}
          <header className="relative z-20">
            <Header />
          </header>

          {/* Hero section with lower z-index to appear below card */}
          <div className="hero-section relative z-0">
            <Hero />
          </div>
          <hr className="border-t relative w-screen left-[50%] right-[50%] -translate-x-[50%] my-8" />
          {/* Content after hero section */}
          <div className="relative min-h-[70vh] w-full z-0">
            <Projects />
          </div>

          <hr className="border-t relative w-screen left-[50%] right-[50%] -translate-x-[50%] my-8" />
          <div className="relative min-h-[70vh] w-full z-0">
            <Work />
          </div>
          <hr className="border-t relative w-screen left-[50%] right-[50%] -translate-x-[50%] my-8" />

          <div className="relative min-h-[80vh] w-full z-0">
            <Moments />
          </div>
          <hr className="border-t relative w-screen left-[50%] right-[50%] -translate-x-[50%] my-8" />
          <div className="relative min-h-[80vh] w-full z-0">
            <ComingSoon />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
