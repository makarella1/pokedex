import { collection, Query, query } from "firebase/firestore";

import { db } from "../config";

import { useCollection } from "./useCollection";

export const useUsersCollection = () => {
  const { data, isLoading } = useCollection(
    query(collection(db, "users")) as Query<UserDocument>
  );

  return { data, isLoading };
};
