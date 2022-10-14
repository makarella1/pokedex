import React from "react";

import { ThemeContext } from "./ThemeContext";

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [theme, setThemeContext] = React.useState<Theme>(
    (localStorage.getItem("theme") as Theme) ?? "dark"
  );

  React.useEffect(() => {
    document.documentElement.classList.remove(
      theme === "dark" ? "light" : "dark"
    );
    document.documentElement.classList.add(theme);

    localStorage.getItem("theme");
  }, [theme]);

  const setTheme = React.useCallback(
    (theme: Theme) => {
      localStorage.setItem("theme", theme);
      setThemeContext(theme);
    },
    [theme]
  );

  const value = React.useMemo(
    () => ({
      setTheme,
      theme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
