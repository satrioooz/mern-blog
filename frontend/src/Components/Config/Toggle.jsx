import React,{useState,useContext} from "react";
import { ThemeContext } from "./ThemeContent";

export const Toggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  function isDark() {
    return theme === "dark";
  }

  function toggleTheme(e) {
    setTheme(e.target.checked ? "dark" : "light");
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={isDark()}
        onChange={(e) => toggleTheme(e)}
      />
      Dark Mode
    </label>
  );
};
