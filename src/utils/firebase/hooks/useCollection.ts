import { onSnapshot, Query } from "firebase/firestore";
import React from "react";

import { usePromise } from "../../hooks";

export const useCollection = <T>(query: Query<T>) => {
  const { data, setData, isLoading, error, setError } = usePromise<T[]>();

  React.useEffect(() => {
    const unsub = onSnapshot(query, (querySnapshot) => {
      const data: T[] = [];

      querySnapshot.forEach((doc) => data.push(doc.data()));

      setData(data);
    });

    return () => unsub();
  }, []);

  return { data, isLoading, error, setError };
};
