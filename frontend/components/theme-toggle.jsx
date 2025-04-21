"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component has mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // or return a static placeholder button if needed

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className={className}
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-slate-700 dark:text-slate-400" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
