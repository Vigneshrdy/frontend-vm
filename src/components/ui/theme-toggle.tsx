import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full bg-secondary border border-border p-1 transition-colors duration-300 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Track icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <Sun className="w-4 h-4 text-gold" />
        <Moon className="w-4 h-4 text-primary" />
      </div>
      
      {/* Sliding thumb */}
      <motion.div
        className="relative z-10 w-6 h-6 rounded-full bg-primary shadow-lg flex items-center justify-center"
        initial={false}
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-primary-foreground" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-primary-foreground" />
        )}
      </motion.div>
    </button>
  );
};
