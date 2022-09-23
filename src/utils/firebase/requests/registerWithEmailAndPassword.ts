import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

import { auth, db } from '../../../firebase';

export const registerWithEmailAndPassword = async (
  user: User,
  password: string
) => {
  const { user: userData } = await createUserWithEmailAndPassword(
    auth,
    user.email,
    password
  );

  const newUser = { ...userData };

  newUser.displayName = `${user.firstName} ${user.lastName}`;

  await addDoc(collection(db, 'users'), {
    ...newUser,
  });
};
