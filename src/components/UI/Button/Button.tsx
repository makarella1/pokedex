import { clsx } from 'clsx';
import React from 'react';

import styles from './Button.module.css';

type ButtonVariant = 'blue' | 'red' | 'outlinedBlue' | 'outlinedRed';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  ...props
}) => (
  <button
    className={clsx(
      styles.button,
      variant === 'blue' && styles.buttonBlue,
      variant === 'red' && styles.buttonRed,
      variant === 'outlinedBlue' && styles.buttonOutlinedBlue,
      variant === 'outlinedRed' && styles.buttonOutlinedRed
    )}
    {...props}
  >
    {children}
  </button>
);
