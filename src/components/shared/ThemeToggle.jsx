"use client"
import { useTheme } from "../hooks/useTheme"
import { Sun, Moon } from "lucide-react"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}

export default ThemeToggle

