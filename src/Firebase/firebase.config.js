// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv-x-dJltyHUKHUk2iuA8C2c2fHwKpbLs",
  authDomain: "email-pass-auth-b63d3.firebaseapp.com",
  projectId: "email-pass-auth-b63d3",
  storageBucket: "email-pass-auth-b63d3.appspot.com",
  messagingSenderId: "826114062576",
  appId: "1:826114062576:web:7488063dfb93ec6c61ea35",
  measurementId: "G-KLFTGNSTTJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
