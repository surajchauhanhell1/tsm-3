import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1Nh8kshWjebhbF4IoKb1xbK9ZmoJXgcM",
  authDomain: "hackathon-3e1d3.firebaseapp.com",
  projectId: "hackathon-3e1d3",
  storageBucket: "hackathon-3e1d3.firebasestorage.app",
  messagingSenderId: "2562852620",
  appId: "1:2562852620:web:92073d0916474e2582eb29",
  measurementId: "G-KYJQXVKJNH"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
