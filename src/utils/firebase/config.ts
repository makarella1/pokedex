// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcuYCCUDZ6SMsbm4It0WlcwmiPgHwyEuI",
  authDomain: "pokedex-d5189.firebaseapp.com",
  projectId: "pokedex-d5189",
  storageBucket: "pokedex-d5189.appspot.com",
  messagingSenderId: "785058945970",
  appId: "1:785058945970:web:a5c2923cfaf1fe9a3ba2ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
