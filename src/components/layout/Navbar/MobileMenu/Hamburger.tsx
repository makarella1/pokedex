import { clsx } from "clsx";
import React from "react";
import ReactDOM from "react-dom";

import { ActiveMobileMenu } from "./ActiveMobileMenu";

import styles from "./Hamburger.module.css";

export const Hamburger: React.FC = () => {
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    const overflowOptions = isActive ? "hidden" : "unset";

    document.body.setAttribute("style", `overflow-y:${overflowOptions}`);

    return () => {
      document.body.setAttribute("style", `overflow-y:unset`);
    };
  }, [isActive]);

  return (
    <>
      <button
        onClick={() => setIsActive((prevState) => !prevState)}
        className={styles.hamburger}
      >
        <span className={clsx(styles.line, isActive && styles.lineActive)} />
        <span className={clsx(styles.line, isActive && styles.lineActive)} />
        <span className={clsx(styles.line, isActive && styles.lineActive)} />
      </button>
      {isActive &&
        ReactDOM.createPortal(
          <ActiveMobileMenu onClose={() => setIsActive(false)} />,
          document.getElementById("modal") as HTMLElement
        )}
    </>
  );
};
