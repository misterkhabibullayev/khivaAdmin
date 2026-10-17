import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="w-8 h-8 flex items-center justify-center bg-light-second dark:bg-dark-second border border-link-hover rounded-sm cursor-pointer transition-transform active:scale-95"
    >
      {theme === "light" ? (
        <Sun className="w-5 h-5 transition-all duration-200 rotate-0 scale-100 opacity-100 text-link-hover" />
      ) : (
        <Moon className="w-5 h-5 transition-all duration-200 rotate-0 scale-100 opacity-100 text-link-hover" />
      )}
    </button>
  );
}
