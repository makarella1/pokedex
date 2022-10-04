import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../config";

import { addDocument } from "./addDocument";

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

  addDocument(
    "users",
    { ...newUser, uid: newUser.uid, pokemons: [] },
    newUser.uid
  );
};
