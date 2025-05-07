import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../theme-provider";

function Header() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // ✅ added

  useEffect(() => {
    setMounted(true); // ✅ now we know we're on the client

    document.documentElement.classList.add("theme-transition");
    const handleTransitionEnd = () => {
      document.documentElement.classList.remove("theme-transition");
    };
    document.documentElement.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      document.documentElement.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, []);

  const handleThemeChange = () => {
    document.documentElement.classList.add("theme-transition");
    setTheme(theme === "light" ? "dark" : "light");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const viewportHeight = window.innerHeight;
      const elementRect = element.getBoundingClientRect();
      const scrollPosition =
        window.scrollY +
        elementRect.top -
        viewportHeight / 2 +
        elementRect.height / 2;

      if (sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (sectionId === "newsletter") {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-3 bg-background w-full z-20">
        <div className="flex items-center">
          <div className="text-base text-[var(--primary)]">Efe Costu</div>
        </div>

        <div className="flex items-center gap-4">
          <ul className="hidden sm:flex items-center gap-4 social-link">
            {["about", "experience", "education", "worth to mention", "contact"].map((text, idx) => (
              <li key={text}>
                <button
                  onClick={() => scrollToSection(
                    ["hero", "projects", "work", "moments", "contact"][idx]
                  )}
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={handleThemeChange}
              className="p-2 rounded-md bg-transparent hover:bg-[var(--accent)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-[18px] w-[18px] text-[var(--muted-foreground)]" />
              ) : (
                <Sun className="h-[18px] w-[18px] text-[var(--muted-foreground)]" />
              )}
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-md hover:bg-[var(--accent)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-[18px] w-[18px] text-[var(--muted-foreground)]" />
            ) : (
              <Menu className="h-[18px] w-[18px] text-[var(--muted-foreground)]" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden fixed inset-0 top-[57px] bg-background z-50">
          <ul className="flex flex-col items-center gap-6 pt-8">
            {["about", "projects", "work", "moments", "contact"].map((text, idx) => (
              <li key={text}>
                <button
                  onClick={() => scrollToSection(
                    ["hero", "projects", "work", "moments", "contact"][idx]
                  )}
                  className="text-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <hr className="border-t border-[var(--border)] relative w-screen left-[50%] right-[50%] -translate-x-[50%]" />
    </div>
  );
}

export default Header;
