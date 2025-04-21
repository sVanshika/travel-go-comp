// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyANsM3jMr3xLF0_bc1hti1-47HVlAayzSU",
  authDomain: "travel-go-db72e.firebaseapp.com",
  projectId: "travel-go-db72e",
  storageBucket: "travel-go-db72e.firebasestorage.app",
  messagingSenderId: "737260595101",
  appId: "1:737260595101:web:b0cf43cdb07f516a5c3174",
  measurementId: "G-MZ34BR3YQ8",
};

// Initialize Firebase app only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Auth, Firestore, Storage exports
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
