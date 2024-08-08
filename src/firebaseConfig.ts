// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7cKPG4kHUdAjBnxWLmbEe_dCvXi0art8",
  authDomain: "aalter-digital-twins.firebaseapp.com",
  databaseURL: "https://aalter-digital-twins-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "aalter-digital-twins",
  storageBucket: "aalter-digital-twins.appspot.com",
  messagingSenderId: "690214409307",
  appId: "1:690214409307:web:cada042de1259e61b4db7e",
  measurementId: "G-QXN6ZNHR3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };