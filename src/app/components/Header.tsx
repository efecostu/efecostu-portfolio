import React from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";

function Header() {
  const { theme, setTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 20; // 20px offset from the top
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-3 bg-background w-full z-20">
        <div className="flex items-center">
          <div className="text-base text-[var(--primary)]">Dakshi Goel</div>
        </div>
        <div className="flex items-center gap-4">
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
        </div>
      </div>

      {/* Full width divider that breaks out of container */}
      <hr className="border-t border-[var(--border)] relative w-screen left-[50%] right-[50%] -translate-x-[50%]" />
    </div>
  );
}

export default Header;
