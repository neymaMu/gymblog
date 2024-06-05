// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mern-blog-bd2fe.firebaseapp.com",
  projectId: "mern-blog-bd2fe",
  storageBucket: "mern-blog-bd2fe.appspot.com",
  messagingSenderId: "187679414352",
  appId: "1:187679414352:web:571c4c0d965cdd597f9955"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);