// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "unipeers-1d6d5.firebaseapp.com",
  projectId: "unipeers-1d6d5",
  storageBucket: "unipeers-1d6d5.firebasestorage.app",
  messagingSenderId: "1095314942349",
  appId: "1:1095314942349:web:dd464ca67d92374d9535c4"
};

// Initialize Firebase
const app = 
!getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };


