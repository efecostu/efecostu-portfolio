import React, { useState } from "react";

import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../theme-provider";

function Header() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get the viewport height
      const viewportHeight = window.innerHeight;
      // Get the element's position relative to the viewport
      const elementRect = element.getBoundingClientRect();
      // Calculate the scroll position to center the element
      const scrollPosition =
        window.scrollY +
        elementRect.top -
        viewportHeight / 2 +
        elementRect.height / 2;

      // Special handling for first and last sections
      if (sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (sectionId === "thoughts") {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
      }
    }
    // Close menu after clicking a link on mobile
    setIsMenuOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center p-3 bg-background w-full z-20">
        <div className="flex items-center">
          <div className="text-base text-[var(--primary)]">Dakshi Goel</div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md bg-transparent hover:bg-[var(--accent)] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-[var(--muted-foreground)]" />
              ) : (
                <Menu className="h-5 w-5 text-[var(--muted-foreground)]" />
              )}
            </button>
          </div>

          {/* Theme toggle - always visible */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-md bg-transparent hover:bg-[var(--accent)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-[18px] w-[18px] text-[var(--muted-foreground)]" />
            ) : (
              <Sun className="h-[18px] w-[18px] text-[var(--muted-foreground)]" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-4">
            <ul className="flex items-center gap-4 social-link">
              <li>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  about
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("work")}
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  work
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("moments")}
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  moments
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("thoughts")}
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  thoughts
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b border-[var(--border)]">
          <ul className="flex flex-col items-center gap-4 py-4">
            <li>
              <button
                onClick={() => scrollToSection("hero")}
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                about
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                projects
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("work")}
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                work
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("moments")}
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                moments
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("thoughts")}
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                thoughts
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Full width divider that breaks out of container */}
      <hr className="border-t border-[var(--border)] relative w-screen left-[50%] right-[50%] -translate-x-[50%]" />
    </div>
  );
}

export default Header;
