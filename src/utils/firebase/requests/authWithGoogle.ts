import { signInWithPopup } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

import { auth, db, googleProvider } from "../config";

import { addDocument } from "./addDocument";

export const authWithGoogle = async () => {
  const { user } = await signInWithPopup(auth, googleProvider);

  const q = query(collection(db, "users"), where("uid", "==", user.uid));

  const docs = await getDocs(q);

  if (docs.docs.length === 0) {
    addDocument(
      "users",
      {
        email: user.email,
        displayName: user.displayName,
        pokemons: [],
        uid: user.uid,
      },
      user.uid
    );
  }

  return user;
};
