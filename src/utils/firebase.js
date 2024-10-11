// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDD5-nZVV_u1GS7qFEuA4q5FuACx4UQMD4",
  authDomain: "netflixgpt-54438.firebaseapp.com",
  projectId: "netflixgpt-54438",
  storageBucket: "netflixgpt-54438.appspot.com",
  messagingSenderId: "944500980304",
  appId: "1:944500980304:web:e1c8696c619bc1275aaf55",
  measurementId: "G-CJVZ9HRD33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();