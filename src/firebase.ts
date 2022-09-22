// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAcuYCCUDZ6SMsbm4It0WlcwmiPgHwyEuI',
  authDomain: 'pokedex-d5189.firebaseapp.com',
  projectId: 'pokedex-d5189',
  storageBucket: 'pokedex-d5189.appspot.com',
  messagingSenderId: '785058945970',
  appId: '1:785058945970:web:a5c2923cfaf1fe9a3ba2ab',
};

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const registerWithEmailAndPassword = async (
  user: User,
  password: string
) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};
