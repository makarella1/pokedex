import React from "react";

import styles from "./Backdrop.module.css";

interface BackdropProps {
  onClick: () => void;
}

export const Backdrop: React.FC<BackdropProps> = ({ onClick }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div className={styles.backdrop} onClick={onClick} />
);
