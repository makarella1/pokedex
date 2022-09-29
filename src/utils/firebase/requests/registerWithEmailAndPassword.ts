import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import { auth, db } from "../../../firebase";

export const registerWithEmailAndPassword = async (
  user: User,
  password: string
) => {
  const { user: newUser } = await createUserWithEmailAndPassword(
    auth,
    user.email,
    password
  );

  updateProfile(newUser, { displayName: `${user.name}` });

  await addDoc(collection(db, "users"), {
    ...user,
  });
};
