// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft, FaMoon, FaSun } from "react-icons/fa";
 
export default function Navbar({
  title,
  subtitle,
  showHome = false,
  showBack = false,
  extraButtons = [],
}) {
  const navigate = useNavigate();
  const [isDark, setIsDark] = React.useState(false);
 
  const handleDarkmode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };
 
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-slate-800 shadow-md px-4 py-3 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {showHome && (
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-110 transition-all cursor-pointer"
          >
            <FaHome />
          </button>
        )}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>
 
      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Extra Buttons */}
        {extraButtons.map((btn, idx) => (
          <button key={idx} onClick={btn.onClick} className={btn.className}>
            {btn.icon} {btn.label}
          </button>
        ))}
 
        {/* Dark Mode */}
        <button
          onClick={handleDarkmode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-110 transition-all cursor-pointer"
        >
          {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
 
        {/* Back */}
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
          >
            <FaArrowLeft />
          </button>
        )}
      </div>
    </div>
  );
}
 
 