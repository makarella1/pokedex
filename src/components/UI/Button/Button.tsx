import { clsx } from "clsx";
import React from "react";

import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: ButtonVariant;
}

export const Button = ({ children, variant, ...props }: ButtonProps) => (
  <button className={clsx(styles.button, styles[variant])} {...props}>
    {children}
  </button>
);
