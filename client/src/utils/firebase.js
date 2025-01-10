// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
//   apiKey: "AIzaSyAsIUTpigIsp2roG4eZmViCUJ0KJPyHrUw",
  apiKey:import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "gestion-des-taches-25ad1.firebaseapp.com",
  projectId: "gestion-des-taches-25ad1",
  storageBucket: "gestion-des-taches-25ad1.firebasestorage.app",
  messagingSenderId: "912618894256",
  appId: "1:912618894256:web:736881f15c5c6454619c75"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);