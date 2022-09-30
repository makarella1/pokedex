import { signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { auth, db, googleProvider } from "../config";

export const authWithGoogle = async () => {
  const { user } = await signInWithPopup(auth, googleProvider);

  const q = query(collection(db, "users"), where("uid", "==", user.uid));

  const docs = await getDocs(q);

  if (docs.docs.length === 0) {
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    });
  }

  return user;
};
