import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

import { usePromise } from "../../hooks";
import { auth, db } from "../config";

export const useAuthState = () => {
  const { data, setData, isLoading, setIsLoading } =
    usePromise<UserDocument | null>();

  React.useEffect(() => {
    const listenter = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsLoading(false);
        return setData(null);
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));

      setData({ ...user, pokemons: userDoc.data()?.pokemons });
    });

    return () => listenter();
  }, [auth]);

  return { data, isLoading };
};
