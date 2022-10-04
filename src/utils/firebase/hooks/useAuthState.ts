import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";

import { usePromise } from "../../hooks";
import { auth, db } from "../config";

export const useAuthState = () => {
  const { data, setData, isLoading, setIsLoading, setError, isError, error } =
    usePromise<User>();

  React.useEffect(() => {
    const listenter = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsLoading(false);
      }

      const q = query(collection(db, "users"), where("uid", "==", user?.uid));

      const unsub = onSnapshot(
        q,
        (querySnapshot) => {
          const data: User[] = [];
          querySnapshot.forEach((doc) => data.push(doc.data() as User));

          setData(data[0]);
          setIsLoading(false);
        },
        (error) => setError(error.message)
      );

      return () => unsub();
    });

    return () => listenter();
  }, [auth]);

  return { data, isLoading, isError, error };
};
