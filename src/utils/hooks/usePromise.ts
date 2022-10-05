import React from "react";

export const usePromise = <T>() => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  return {
    isLoading,
    setIsLoading,
    error,
    setError,
    isError: !!error,
    data,
    setData: (promiseData: T) => {
      setIsLoading(false);
      setData(promiseData);
    },
  };
};
