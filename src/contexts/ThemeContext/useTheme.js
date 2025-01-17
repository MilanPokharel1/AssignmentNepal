import { useContext } from "react";
import { ThemeContext } from "./ThemeContext.js";

export const UseTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
