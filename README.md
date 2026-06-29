# Aditya Kumar — Full-Stack Developer & AI/ML Engineer Portfolio

A premium, responsive, and dynamic full-stack portfolio built for **Aditya Kumar** (B.Tech Computer Science student specializing in AI/ML at Christ University, Bangalore). 

This project is built using a modern full-stack architecture featuring **TanStack Start** (hybrid/SSR React framework), **TypeScript**, **Tailwind CSS v4**, and **Firebase** for cloud authentication and database storage, with structured fallback data.

---

## 🚀 Key Features

* **Dynamic Portfolio Showcase**: 
  - **Projects Grid**: Showcases projects with filtering/displaying tech stacks, descriptions, GitHub repository links, and live URLs.
  - **Skills Categories**: Categorized display of skills (Frontend, Backend, Database, AI/ML, DSA, Tools).
  - **Interactive Timeline**: Highlights professional achievements and education milestones.
  - **Resume Access**: Easily download the latest resume from the cloud.
* **Administrative Suite (`/admin`)**:
  - Secure admin route protected by custom route guards (`RequireAuth`).
  - Integration with **Firebase Auth** supporting Email/Password authentication, password resets, and Google Sign-In.
  - Real-time CRUD capabilities allowing the administrator to add, edit, or delete projects, skills, timeline achievements, and contact links.
  - **Inline Editing**: Double-click inline edits for bio statements and resume links directly from the portfolio view.
* **Premium Design & Micro-Animations**:
  - Minimalist dark theme styled with **Tailwind CSS v4**.
  - Polished micro-interactions, responsive typography, and hover effects using **Lucide Icons** and **Sonner** notifications.
  - Fully responsive grid systems optimized across mobile, tablet, and desktop views.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| --- | --- | --- |
| **Framework** | [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) | Full-stack React 19 framework with file-based routing and SSR |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict type safety across frontend and server handlers |
| **Database** | [Firebase Firestore](https://firebase.google.com/docs/firestore) | Real-time, serverless NoSQL database for project and bio details |
| **Auth** | [Firebase Authentication](https://firebase.google.com/docs/auth) | Google Sign-in & email-based admin access |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern CSS engine for responsive layouts and animations |
| **UI Components** | [Radix UI Primitives](https://www.radix-ui.com/) | Accessible unstyled components (Accordion, Dialog, Tabs, etc.) |
| **Routing** | [TanStack Router](https://tanstack.com/router/v1) | Safe, type-guaranteed routing system |

---

## 📁 Project Structure

```bash
portfolio/
├── supabase/                 # Supabase configuration (pre-setup infrastructure)
├── src/
│   ├── components/
│   │   ├── ui/               # Reusable Radix UI and styled primitives (sonner, calendar, etc.)
│   │   ├── Navbar.tsx        # Responsive navigation layout
│   │   ├── EditableText.tsx  # Admin inline text editing wrapper
│   │   └── RequireAuth.tsx   # Client/Server-side route guard
│   ├── integrations/
│   │   └── supabase/         # Supabase client/auth adapters (optional/secondary)
│   ├── lib/
│   │   ├── auth-context.tsx  # Firebase Auth Provider and hooks
│   │   ├── firebase.ts       # Firebase initialization config
│   │   ├── portfolio-data.ts # Firestore database client query handlers
│   │   ├── seed-data.ts      # Structured fallback portfolio data
│   │   └── utils.ts          # Core styling & class merger utilities
│   ├── routes/
│   │   ├── __root.tsx        # Main application layout wrapper
│   │   ├── index.tsx         # Modern landing hero page
│   │   ├── portfolio.tsx     # Core portfolio dashboard
│   │   ├── login.tsx         # Admin authentication view
│   │   ├── signup.tsx        # Admin sign-up page
│   │   ├── forgot-password.tsx# Password reset view
│   │   ├── admin.tsx         # Dashboard for portfolio management (CRUD)
│   │   └── projects.$id.tsx  # Detailed single-project pages
│   ├── router.tsx            # TanStack Router instance creation
│   ├── server.ts             # Server entry point
│   ├── start.ts              # TanStack Start server instance configuration
│   └── styles.css            # Global stylesheets & Tailwind imports
├── package.json              # Dependencies and start scripts
└── vite.config.ts            # Vite bundler options with TanStack Router plugin
```

---

## ⚙️ Local Development Setup

### Prerequisites
Make sure you have **Node.js** (v18+) and [Bun](https://bun.sh/) (or `npm`) installed.

### 1. Clone the repository
```bash
git clone https://github.com/aditya060414/portfolio.git
cd portfolio
```

### 2. Install dependencies
Using **Bun**:
```bash
bun install
```
Using **npm**:
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory if you want to override the default credentials (optional, fallback credentials are configured in [src/lib/firebase.ts](file:///c:/coding/Web%20Development/FULL%20STACK/Project/MERN/portfolio/src/lib/firebase.ts)):
```env
# Optional credentials override
VITE_FIREBASE_API_KEY="your_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_auth_domain"
VITE_FIREBASE_PROJECT_ID="your_project_id"
```

### 4. Run the Dev Server
Using **Bun**:
```bash
bun dev
```
Using **npm**:
```bash
npm run dev
```
The site will run locally at [http://localhost:3000](http://localhost:3000) (or the port specified in your console).

---

## 🚢 Production Deployment

To build and compile the application for production:

Using **Bun**:
```bash
bun run build
```
Using **npm**:
```bash
npm run build
```

Then, you can preview the production build locally:
```bash
npm run preview
```
