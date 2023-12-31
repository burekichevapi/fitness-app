// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1HWaKkjLiFnmPPLnsr9B5lAgg4k3lIro",
  authDomain: "finess-app-9bc2b.firebaseapp.com",
  projectId: "finess-app-9bc2b",
  storageBucket: "finess-app-9bc2b.appspot.com",
  messagingSenderId: "195338172042",
  appId: "1:195338172042:web:1ffc3cd64e9a9ccfbe5f73",
  measurementId: "G-NM1GJT4JSE",
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export default app;
