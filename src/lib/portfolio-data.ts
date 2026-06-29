import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { getDb } from "./firebase";
import {
  SEED_PROJECTS,
  SEED_SKILLS,
  SEED_ACHIEVEMENTS,
  SEED_BIO,
  SEED_RESUME_URL,
  SEED_CONTACTS,
  type Project,
  type Skill,
  type Achievement,
  type Contact,
} from "./seed-data";

export async function fetchContacts(): Promise<Contact[]> {
  const db = getDb();
  if (!db) return SEED_CONTACTS;
  try {
    const snap = await getDocs(query(collection(db, "contacts"), orderBy("orderIndex")));
    if (snap.empty) return SEED_CONTACTS;
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Contact, "id">) }));
  } catch {
    return SEED_CONTACTS;
  }
}

export async function saveContact(c: Contact) {
  const db = getDb();
  if (!db) throw new Error("No db");
  const { id, ...rest } = c;
  await setDoc(doc(db, "contacts", id), rest, { merge: true });
}

export async function deleteContact(id: string) {
  const db = getDb();
  if (!db) throw new Error("No db");
  await deleteDoc(doc(db, "contacts", id));
}

export async function fetchProjects(): Promise<Project[]> {
  const db = getDb();
  if (!db) return SEED_PROJECTS;
  try {
    const snap = await getDocs(query(collection(db, "projects"), orderBy("orderIndex")));
    if (snap.empty) return SEED_PROJECTS;
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Project, "id">) }));
  } catch {
    return SEED_PROJECTS;
  }
}

export async function saveProject(p: Project) {
  const db = getDb();
  if (!db) throw new Error("No db");
  const { id, ...rest } = p;
  await setDoc(doc(db, "projects", id), rest, { merge: true });
}

export async function deleteProject(id: string) {
  const db = getDb();
  if (!db) throw new Error("No db");
  await deleteDoc(doc(db, "projects", id));
}

export async function fetchSkills(): Promise<Skill[]> {
  const db = getDb();
  if (!db) return SEED_SKILLS;
  try {
    const snap = await getDocs(collection(db, "skills"));
    if (snap.empty) return SEED_SKILLS;
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Skill, "id">) }));
  } catch {
    return SEED_SKILLS;
  }
}

export async function saveSkill(s: Skill) {
  const db = getDb();
  if (!db) throw new Error("No db");
  const { id, ...rest } = s;
  await setDoc(doc(db, "skills", id), rest, { merge: true });
}

export async function deleteSkill(id: string) {
  const db = getDb();
  if (!db) throw new Error("No db");
  await deleteDoc(doc(db, "skills", id));
}

export async function fetchAchievements(): Promise<Achievement[]> {
  const db = getDb();
  if (!db) return SEED_ACHIEVEMENTS;
  try {
    const snap = await getDocs(query(collection(db, "achievements"), orderBy("orderIndex")));
    if (snap.empty) return SEED_ACHIEVEMENTS;
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Achievement, "id">) }));
  } catch {
    return SEED_ACHIEVEMENTS;
  }
}

export async function saveAchievement(a: Achievement) {
  const db = getDb();
  if (!db) throw new Error("No db");
  const { id, ...rest } = a;
  await setDoc(doc(db, "achievements", id), rest, { merge: true });
}

export async function deleteAchievement(id: string) {
  const db = getDb();
  if (!db) throw new Error("No db");
  await deleteDoc(doc(db, "achievements", id));
}

export async function fetchSetting(key: "bio" | "resume_url"): Promise<string> {
  const db = getDb();
  const fallback = key === "bio" ? SEED_BIO : SEED_RESUME_URL;
  if (!db) return fallback;
  try {
    const snap = await getDoc(doc(db, "settings", key));
    if (snap.exists()) return (snap.data() as { value: string }).value ?? fallback;
    return fallback;
  } catch {
    return fallback;
  }
}

export async function saveSetting(key: "bio" | "resume_url", value: string) {
  const db = getDb();
  if (!db) throw new Error("No db");
  await setDoc(doc(db, "settings", key), { value });
}
