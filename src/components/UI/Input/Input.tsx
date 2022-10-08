import { clsx } from "clsx";
import React from "react";
import { FieldError } from "react-hook-form";

import styles from "./Input.module.css";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
  isLoading?: boolean;
  error?: FieldError["message"];
}

export const Input: React.FC<InputProps> = React.forwardRef(
  ({ id, placeholder, error, ...props }, ref) => (
    <label htmlFor={id}>
      <span className={styles.label}>{placeholder}</span>
      <input
        className={clsx(styles.input, error && styles.inputError)}
        id={id}
        ref={ref}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </label>
  )
);
