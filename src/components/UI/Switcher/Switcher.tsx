import { clsx } from "clsx";
import React from "react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

import styles from "./Switcher.module.css";

export const Switcher: React.FC = () => {
  const [theme, setTheme] = React.useState<"dark" | null>(null);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark");
  }, [theme]);

  return (
    <div className="flex items-center gap-2">
      <BsFillSunFill fill={theme === "dark" ? "black" : "white"} />
      <button
        className="flex h-4 w-8 items-center rounded-lg bg-slate-400 px-0.5"
        onClick={() =>
          setTheme((prevState) => (prevState === "dark" ? null : "dark"))
        }
      >
        <div className={clsx(styles.circle, theme !== "dark" && styles.dark)} />
      </button>

      <BsFillMoonStarsFill fill={theme === "dark" ? "black" : "white"} />
    </div>
  );
};
