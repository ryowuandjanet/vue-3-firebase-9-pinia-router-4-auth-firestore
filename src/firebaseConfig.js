import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import getFirestore

const firebaseConfig = {
  apiKey: "AIzaSyCpUUaLPKXxQpcZ2SUbUQ9l4fp09-1Wr5w",
  authDomain: "test-19277.firebaseapp.com",
  databaseURL: "https://test-19277-default-rtdb.firebaseio.com",
  projectId: "test-19277",
  storageBucket: "test-19277.appspot.com",
  messagingSenderId: "567561852471",
  appId: "1:567561852471:web:befbb80e6062fe8d1b11b2",
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(); // Initialize Firestore and store its instance

export { auth, db }; // Export both auth and db for use in other files
