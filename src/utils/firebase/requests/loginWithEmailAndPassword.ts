import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../../firebase';

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => signInWithEmailAndPassword(auth, email, password);
