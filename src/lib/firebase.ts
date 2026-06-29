import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDk-7cYHG26HphztyhJovywhDXLJY5qV_s",
  authDomain: "aditya-portfolio-14.firebaseapp.com",
  projectId: "aditya-portfolio-14",
  storageBucket: "aditya-portfolio-14.firebasestorage.app",
  messagingSenderId: "368854075122",
  appId: "1:368854075122:web:bbb2ca8524775a87df726b",
  measurementId: "G-Y4H054QB8Y",
};

export const firebaseConfigured = true;

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

function ensureApp() {
  if (typeof window === "undefined") return null;
  if (!firebaseConfigured) return null;
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(config);
  }
  return app;
}

export function getFirebaseAuth(): Auth | null {
  const a = ensureApp();
  if (!a) return null;
  if (!authInstance) authInstance = getAuth(a);
  return authInstance;
}

export function getDb(): Firestore | null {
  const a = ensureApp();
  if (!a) return null;
  if (!dbInstance) dbInstance = getFirestore(a);
  return dbInstance;
}

export const ADMIN_EMAIL = "singh.aditya.44618@gmail.com";
