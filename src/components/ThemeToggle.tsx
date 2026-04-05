import { useTheme } from "../global/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`
        relative flex items-center w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none flex-shrink-0
        ${isDark ? "bg-[#343C6A]" : "bg-[#DFEAF2]"}
      `}
      aria-label="Toggle dark mode"
    >
      {/* Sun icon */}
      <span
        className={`absolute left-1.5 text-[13px] transition-opacity duration-200 ${isDark ? "opacity-40" : "opacity-100"}`}
      >
        ☀️
      </span>

      {/* Moon icon */}
      <span
        className={`absolute right-1.5 text-[13px] transition-opacity duration-200 ${isDark ? "opacity-100" : "opacity-40"}`}
      >
        🌙
      </span>

      {/* Sliding knob */}
      <span
        className={`
          absolute w-5 h-5 rounded-full shadow-sm transition-transform duration-300
          ${isDark ? "translate-x-7 bg-white" : "translate-x-1 bg-white"}
        `}
      />
    </button>
  );
};

export default ThemeToggle;
