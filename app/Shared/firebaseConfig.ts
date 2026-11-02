import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDe1PykGZjHiC3HycH2Cx9vgwmA1vtLBRM",
  authDomain: "pinterest-clone-21c40.firebaseapp.com",
  projectId: "pinterest-clone-21c40",
  storageBucket: "pinterest-clone-21c40.firebasestorage.app",
  messagingSenderId: "609939100859",
  appId: "1:609939100859:web:5ddbc2fcd236b70bdb859e",
  measurementId: "G-04MWN853P5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
export default app;