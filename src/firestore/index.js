import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHEvmmVDgQcjQTFY3n5shDuKu3DQ3ku5g",
  authDomain: "pokemon-display.firebaseapp.com",
  projectId: "pokemon-display",
  storageBucket: "pokemon-display.appspot.com",
  messagingSenderId: "146256943323",
  appId: "1:146256943323:web:ff0d628288a263f25214fe",
};

let auth = null;
let db = null;

try {
  const initialize = initializeApp(firebaseConfig);
  auth = getAuth(initialize);
  db = getFirestore(initialize);
} catch (error) {
  console.log("Error:", error);
}

export { db, auth };
