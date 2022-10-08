import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../config";

import { addDocument } from "./addDocument";

export const registerWithEmailAndPassword = async (
  user: User,
  password: string
) => {
  const { user: createdUser } = await createUserWithEmailAndPassword(
    auth,
    user.email,
    password
  );

  updateProfile(createdUser, { displayName: `${user.displayName}` });

  const newUser = {
    displayName: createdUser.displayName,
    email: createdUser.email,
    photoURL: createdUser.photoURL,
  };

  addDocument(
    "users",
    { ...newUser, uid: createdUser.uid, pokemons: [] },
    createdUser.uid
  );
};
