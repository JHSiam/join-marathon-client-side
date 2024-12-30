// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXBQ70R1uQ3axtJhGhh_oiVXxulxyENtk",
  authDomain: "join-marathon.firebaseapp.com",
  projectId: "join-marathon",
  storageBucket: "join-marathon.firebasestorage.app",
  messagingSenderId: "380554663952",
  appId: "1:380554663952:web:4d63c6dc3be676a9a01295",
  measurementId: "G-9NH0WY5N1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);