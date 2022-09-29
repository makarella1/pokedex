import { clsx } from "clsx";
import React from "react";

import styles from "./Button.module.css";

type ButtonVariant = "blue" | "red" | "outlinedBlue" | "outlinedRed" | "plain";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  ...props
}) => (
  <button className={clsx(styles.button, styles[variant])} {...props}>
    {children}
  </button>
);
