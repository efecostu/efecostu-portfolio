"use client";

import Header from "./components/Header";
import Hero from "./Hero";
import Card from "./components/Card";
import { ThemeProvider } from "./theme-provider";

export default function Home() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
      <div className="min-h-screen p-0 font-[family-name:var(--font-geist-sans)]">
        <Card />
        {/* Main content area */}
        <div>
          <Header />
          <Hero />

          <hr className="border-t relative w-screen left-[50%] right-[50%] -translate-x-[50%] my-8" />
        </div>
      </div>
    </ThemeProvider>
  );
}
