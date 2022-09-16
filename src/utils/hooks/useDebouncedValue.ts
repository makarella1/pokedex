import React from 'react';

export const useDebouncedValue = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState<any>();

  React.useEffect(() => {
    if (!value) {
      setDebouncedValue(value);
    }

    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debouncedValue;
};
