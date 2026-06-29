import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as fbSignOut,
  sendPasswordResetEmail,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirebaseAuth, getDb, ADMIN_EMAIL, firebaseConfigured } from "./firebase";

interface AuthCtx {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  configured: boolean;
  loginEmail: (email: string, password: string) => Promise<void>;
  signupEmail: (name: string, email: string, password: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const db = getDb();
        let admin = false;
        if (db) {
          try {
            const snap = await getDoc(doc(db, "admins", u.uid));
            admin = snap.exists();
            // Auto-promote the configured admin email
            if (!admin && u.email === ADMIN_EMAIL) {
              await setDoc(doc(db, "admins", u.uid), { email: u.email });
              admin = true;
            }
          } catch {
            admin = u.email === ADMIN_EMAIL;
          }
        }
        setIsAdmin(admin);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const value: AuthCtx = {
    user,
    isAdmin,
    loading,
    configured: firebaseConfigured,
    loginEmail: async (email, password) => {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error("Firebase not configured");
      await signInWithEmailAndPassword(auth, email, password);
    },
    signupEmail: async (name, email, password) => {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error("Firebase not configured");
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(cred.user, { displayName: name });
    },
    loginGoogle: async () => {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error("Firebase not configured");
      await signInWithPopup(auth, new GoogleAuthProvider());
    },
    resetPassword: async (email) => {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error("Firebase not configured");
      await sendPasswordResetEmail(auth, email);
    },
    logout: async () => {
      const auth = getFirebaseAuth();
      if (auth) await fbSignOut(auth);
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
