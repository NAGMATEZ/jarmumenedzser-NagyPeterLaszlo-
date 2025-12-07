// ------------------------------------------------------
// Firebase configuration
// ------------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCWr4-8zl4rpEf0YD9UxIEntPAWefLecI",
  authDomain: "jarmu-menedzser.firebaseapp.com",
  projectId: "jarmu-menedzser",
  storageBucket: "jarmu-menedzser.firebasestorage.app",
  messagingSenderId: "519293220910",
  appId: "1:519293220910:web:8c5c3b29123107c817c7bf",
  measurementId: "G-QCDVZR8843"
};
// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
setPersistence(auth, browserLocalPersistence);

export { auth, signInWithEmailAndPassword };


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries
