import React from "react";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const INITIAL_THEME = (localStorage.getItem("theme") as Theme) ?? "dark";

export const ThemeContext = React.createContext<ThemeContextProps>({
  theme: INITIAL_THEME,
  setTheme: () => {},
});
