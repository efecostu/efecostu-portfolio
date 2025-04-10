import React from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";

function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <div className="flex justify-between items-center p-3 w-full z-20">
        <div className="flex items-center">
          <div className="text-base text-[var(--primary)]">Dakshi Goel</div>
        </div>
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-4 social-link">
            <li>
              <Link
                href="/"
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                About
              </Link>
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
