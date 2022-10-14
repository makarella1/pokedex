import { clsx } from "clsx";
import React, { HTMLAttributes } from "react";

import styles from "./SettingsButton.module.css";

interface EditButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit";
}

export const SettingsButton: React.FC<EditButtonProps> = ({
  children,
  className,
  type,
  ...props
}) => (
  <button className={clsx(styles.button, className)} type={type} {...props}>
    {children}
  </button>
);
