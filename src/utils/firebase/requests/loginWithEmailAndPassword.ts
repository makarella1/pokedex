import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../config";

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => signInWithEmailAndPassword(auth, email, password);
