export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  orderIndex: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  orderIndex: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Contact {
  id: string;
  label: string;
  value: string;
  url: string;
  icon: "mail" | "github" | "linkedin" | "twitter" | "globe" | "phone" | "leetcode";
  orderIndex: number;
}

export const SEED_CONTACTS: Contact[] = [
  { id: "c1", label: "Email", value: "singh.aditya.44618@gmail.com", url: "mailto:singh.aditya.44618@gmail.com", icon: "mail", orderIndex: 1 },
  { id: "c2", label: "GitHub", value: "aditya060414", url: "https://github.com/aditya060414", icon: "github", orderIndex: 2 },
  { id: "c3", label: "LinkedIn", value: "aditya060414", url: "https://www.linkedin.com/in/aditya060414", icon: "linkedin", orderIndex: 3 },
];

export const CONTACT_ICONS = ["mail", "github", "linkedin", "twitter", "globe", "phone", "leetcode"] as const;

export const SEED_PROJECTS: Project[] = [
  {
    id: "campusflow",
    title: "CampusFlow",
    description: "AI-powered student productivity platform with retrieval-augmented context.",
    techStack: ["MERN", "FastAPI", "RAG"],
    githubUrl: "https://github.com/aditya060414",
    liveUrl: "",
    imageUrl: "",
    orderIndex: 1,
  },
  {
    id: "dailyos",
    title: "DailyOS",
    description: "Personal life-tracking app with cross-platform Android support.",
    techStack: ["MERN", "TypeScript", "Capacitor"],
    githubUrl: "https://github.com/aditya060414",
    liveUrl: "",
    imageUrl: "",
    orderIndex: 2,
  },
  {
    id: "ai-spend-audit",
    title: "AI Spend Audit",
    description: "SaaS tool that audits AI usage costs across providers.",
    techStack: ["MERN", "Anthropic API", "Vitest"],
    githubUrl: "https://github.com/aditya060414",
    liveUrl: "",
    imageUrl: "",
    orderIndex: 3,
  },
  {
    id: "day-trip-genie",
    title: "Day Trip Genie",
    description: "Agentic AI travel planner that builds full itineraries on demand.",
    techStack: ["Google ADK", "Gemini 2.5 Flash"],
    githubUrl: "https://github.com/aditya060414",
    liveUrl: "",
    imageUrl: "",
    orderIndex: 4,
  },
  {
    id: "marketex",
    title: "MarketEx",
    description: "Real-time stock trading platform with live order book updates.",
    techStack: ["MERN", "Redis", "WebSocket"],
    githubUrl: "https://github.com/aditya060414",
    liveUrl: "",
    imageUrl: "",
    orderIndex: 5,
  },
];

export const SEED_SKILLS: Skill[] = [
  { id: "s1", name: "React", category: "Frontend" },
  { id: "s2", name: "TypeScript", category: "Frontend" },
  { id: "s3", name: "Tailwind CSS", category: "Frontend" },
  { id: "s4", name: "Node.js", category: "Backend" },
  { id: "s5", name: "Express.js", category: "Backend" },
  { id: "s6", name: "FastAPI", category: "Backend" },
  { id: "s7", name: "MongoDB", category: "Database" },
  { id: "s8", name: "Firebase", category: "Database" },
  { id: "s9", name: "Redis", category: "Database" },
  { id: "s10", name: "Python", category: "AI/ML" },
  { id: "s11", name: "TensorFlow", category: "AI/ML" },
  { id: "s12", name: "RAG", category: "AI/ML" },
  { id: "s13", name: "LangChain", category: "AI/ML" },
  { id: "s14", name: "Google ADK", category: "AI/ML" },
  { id: "s15", name: "Gemini", category: "AI/ML" },
  { id: "s16", name: "Java", category: "DSA" },
  { id: "s17", name: "Git", category: "Tools" },
  { id: "s18", name: "Docker", category: "Tools" },
  { id: "s19", name: "Socket.io", category: "Tools" },
  { id: "s20", name: "Postman", category: "Tools" },
];

export const SEED_ACHIEVEMENTS: Achievement[] = [
  {
    id: "a1",
    title: "1st Runner-Up — Hackathon",
    description: "Recognized for an AI-driven student productivity prototype.",
    year: "2024",
    orderIndex: 1,
  },
  {
    id: "a2",
    title: "B.Tech CS (AI/ML) — Christ University, Bangalore",
    description: "Currently pursuing undergraduate degree with focus on AI/ML systems.",
    year: "2023–2027",
    orderIndex: 2,
  },
];

export const SEED_BIO =
  "I'm Aditya — a B.Tech CS (AI/ML) student at Christ University, Bangalore, building full-stack products and agentic AI systems. I work across the MERN stack, ship in TypeScript and Tailwind, and obsess over clean systems, sharp UX, and DSA in Java.";

export const SEED_RESUME_URL = "";

export const SKILL_CATEGORIES = ["Frontend", "Backend", "Database", "AI/ML", "DSA", "Tools"] as const;
