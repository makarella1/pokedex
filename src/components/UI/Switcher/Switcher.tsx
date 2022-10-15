import { clsx } from "clsx";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

import { useTheme } from "../../../utils/hooks";

import styles from "./Switcher.module.css";

export const Switcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.switcher}>
      <BsFillSunFill className={styles.icon} />
      <button
        className={styles.button}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <div className={clsx(styles.circle, theme === "dark" && styles.dark)} />
      </button>
      <BsFillMoonStarsFill className={styles.icon} />
    </div>
  );
};
