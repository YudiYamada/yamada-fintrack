import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

function ThemeToggleButton() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((v) => !v)}
      className="w-full cursor-pointer rounded border px-3 py-2"
      aria-label="Alternar tema"
    >
      {isDark ? (
        <div className="flex items-center justify-center gap-2">
          <SunIcon className="flex self-start" />
          <span>Modo Escuro</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <MoonIcon className="flex self-end" />
          <span>Modo Claro</span>
        </div>
      )}
    </button>
  );
}

export default ThemeToggleButton;
