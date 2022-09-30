import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import { auth, db } from "../config";

export const registerWithEmailAndPassword = async (
  user: User,
  password: string
) => {
  const { user: newUser } = await createUserWithEmailAndPassword(
    auth,
    user.email,
    password
  );

  updateProfile(newUser, { displayName: `${user.displayName}` });

  await addDoc(collection(db, "users"), {
    uid: newUser.uid,
    displayName: newUser.displayName,
    email: newUser.email,
  });
};
