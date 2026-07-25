import { useEffect, useState } from "react";
import Portfolio from "./Portfolio";
import P5Background from "./P5Background.jsx";
import MouseTrail from "./MouseTrail.jsx";

function getAutomaticTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const darkPreference = window.matchMedia("(prefers-color-scheme: dark)");
  const lightPreference = window.matchMedia("(prefers-color-scheme: light)");

  if (darkPreference.matches) {
    return "dark";
  }

  if (lightPreference.matches) {
    return "light";
  }

  const currentHour = new Date().getHours();
  return currentHour >= 7 && currentHour < 19 ? "light" : "dark";
}

function getSavedTheme() {
  if (typeof window === "undefined") {
    return null;
  }

  const savedTheme = window.localStorage.getItem("ray-digital-theme");
  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
}

function getInitialTheme() {
  return getSavedTheme() || getAutomaticTheme();
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [hasManualTheme, setHasManualTheme] = useState(
    () => getSavedTheme() !== null
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    if (hasManualTheme) {
      return undefined;
    }

    const darkPreference = window.matchMedia("(prefers-color-scheme: dark)");
    const lightPreference = window.matchMedia("(prefers-color-scheme: light)");
    const updateAutomaticTheme = () => setTheme(getAutomaticTheme());
    const timeCheck = window.setInterval(updateAutomaticTheme, 60_000);

    darkPreference.addEventListener("change", updateAutomaticTheme);
    lightPreference.addEventListener("change", updateAutomaticTheme);

    return () => {
      window.clearInterval(timeCheck);
      darkPreference.removeEventListener("change", updateAutomaticTheme);
      lightPreference.removeEventListener("change", updateAutomaticTheme);
    };
  }, [hasManualTheme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      window.localStorage.setItem("ray-digital-theme", nextTheme);
      return nextTheme;
    });
    setHasManualTheme(true);
  };

  return (
    <div className={`app-shell theme-${theme}`}>
      <P5Background theme={theme} />
      <MouseTrail theme={theme} />
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <span aria-hidden="true">{theme === "dark" ? "✺" : "⏾"}</span>
      </button>
      <Portfolio />
    </div>
  );
}
