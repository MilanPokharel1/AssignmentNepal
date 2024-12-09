import React, { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { themes } from "../../Themes/index.js";

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("default");

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themes }}>
      <div className={`min-h-screen ${themes[currentTheme].background}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
