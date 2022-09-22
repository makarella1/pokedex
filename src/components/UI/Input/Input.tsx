import React from 'react';

import styles from './Input.module.css';

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  isLoading?: boolean;
}

export const Input: React.FC<InputProps> = React.forwardRef(
  ({ id, placeholder, ...props }, ref) => (
    <label htmlFor={id}>
      <span className={styles.label}>{placeholder}</span>
      <input className={styles.input} id={id} ref={ref} {...props} />
    </label>
  )
);
