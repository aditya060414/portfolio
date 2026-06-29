import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { RequireAuth } from "@/components/RequireAuth";
import { useAuth } from "@/lib/auth-context";
import { EditableText } from "@/components/EditableText";
import {
  fetchProjects,
  fetchSkills,
  fetchAchievements,
  fetchSetting,
  fetchContacts,
  saveSetting,
} from "@/lib/portfolio-data";
import { SKILL_CATEGORIES, type Project, type Skill, type Achievement, type Contact } from "@/lib/seed-data";
import { Github, ExternalLink, Mail, Linkedin, Download, Twitter, Globe, Phone } from "lucide-react";
import { toast } from "sonner";

function LeetcodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
    </svg>
  );
}

const CONTACT_ICON_MAP = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  globe: Globe,
  phone: Phone,
  leetcode: LeetcodeIcon,
} as const;

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Aditya Kumar" },
      { name: "description", content: "Projects, skills and achievements." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <PortfolioPage />
    </RequireAuth>
  ),
});

function PortfolioPage() {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [skills, setSkills] = useState<Skill[] | null>(null);
  const [achievements, setAchievements] = useState<Achievement[] | null>(null);
  const [bio, setBio] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [contacts, setContacts] = useState<Contact[] | null>(null);

  useEffect(() => {
    fetchProjects().then(setProjects);
    fetchSkills().then(setSkills);
    fetchAchievements().then(setAchievements);
    fetchSetting("bio").then(setBio);
    fetchSetting("resume_url").then(setResumeUrl);
    fetchContacts().then(setContacts);
  }, []);

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">/ hero</div>
          <h1 className="mt-4 font-display text-6xl font-bold leading-[1.05] tracking-tighter md:text-8xl">
            Aditya Kumar
          </h1>
          <p className="mt-4 font-mono text-sm uppercase tracking-widest text-muted-foreground">
            Full Stack Developer · AI/ML · DSA
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="border border-primary bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground">
              View My Work
            </a>
            <a href="https://github.com/aditya060414" target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:border-primary">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/aditya060414" target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:border-primary">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" label="/ about" title="About">
        <div className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
          <EditableText
            value={bio}
            canEdit={isAdmin}
            multiline
            onSave={async (v) => {
              await saveSetting("bio", v);
              setBio(v);
              toast.success("Bio saved");
            }}
          />
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" label="/ skills" title="Skills">
        {!skills ? (
          <SkeletonGrid />
        ) : (
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {SKILL_CATEGORIES.map((cat) => {
              const items = skills.filter((s) => s.category === cat);
              if (!items.length) return null;
              return (
                <div key={cat} className="bg-background p-6">
                  <div className="mb-4 text-xs uppercase tracking-widest text-primary">{cat}</div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((s) => (
                      <span
                        key={s.id}
                        className="border border-border px-3 py-1 text-sm hover:border-primary"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {isAdmin && (
          <p className="mt-4 text-xs text-muted-foreground">
            Manage skills in the{" "}
            <Link to="/admin" className="text-primary hover:underline">
              admin dashboard
            </Link>
            .
          </p>
        )}
      </Section>

      {/* Projects */}
      <Section id="projects" label="/ projects" title="Projects">
        {!projects ? (
          <SkeletonGrid />
        ) : (
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                className={
                  i === projects.length - 1 && projects.length % 2 === 1
                    ? "md:col-span-2"
                    : ""
                }
              />
            ))}
          </div>
        )}
      </Section>

      {/* Achievements */}
      <Section id="achievements" label="/ timeline" title="Achievements & Experience">
        {!achievements ? (
          <SkeletonGrid />
        ) : (
          <ol className="relative space-y-8 border-l-2 border-border pl-6">
            {achievements.map((a) => (
              <li key={a.id} className="relative">
                <span className="absolute -left-[31px] top-2 h-3 w-3 bg-primary" />
                <div className="text-xs uppercase tracking-widest text-primary">{a.year}</div>
                <h3 className="mt-1 font-display text-xl font-bold">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
              </li>
            ))}
          </ol>
        )}
      </Section>

      {/* Resume */}
      <Section id="resume" label="/ resume" title="Resume">
        <div className="flex flex-wrap items-center gap-4">
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-primary bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          ) : (
            <span className="text-sm text-muted-foreground">Resume URL not set.</span>
          )}
          {isAdmin && (
            <div className="w-full max-w-xl">
              <EditableText
                value={resumeUrl}
                canEdit
                placeholder="Paste resume URL"
                onSave={async (v) => {
                  await saveSetting("resume_url", v);
                  setResumeUrl(v);
                  toast.success("Resume URL saved");
                }}
              />
            </div>
          )}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" label="/ contact" title="Contact">
        {!contacts ? (
          <div className="h-20 animate-pulse bg-secondary" />
        ) : contacts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No contacts yet.</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {contacts.map((c) => {
              const Icon = CONTACT_ICON_MAP[c.icon] ?? Mail;
              const url = c.icon === "mail" ? "mailto:singh.aditya.44618@gmail.com" : c.url;
              const external = !url.startsWith("mailto:") && !url.startsWith("tel:");
              return (
                <a
                  key={c.id}
                  href={url}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="flex items-center gap-2 border border-border px-6 py-3 text-sm uppercase tracking-wider hover:border-primary"
                >
                  <Icon className="h-4 w-4" /> {c.label}
                </a>
              );
            })}
          </div>
        )}
        {isAdmin && (
          <p className="mt-4 text-xs text-muted-foreground">
            Manage contacts in the{" "}
            <Link to="/admin" className="text-primary hover:underline">
              admin dashboard
            </Link>
            .
          </p>
        )}
      </Section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Aditya Kumar</span>
          <span className="font-mono">built with intent</span>
        </div>
      </footer>
    </div>
  );
}

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
        <h2 className="mt-2 mb-10 font-display text-4xl font-bold tracking-tighter md:text-5xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function ProjectCard({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <Link
      to="/projects/$id"
      params={{ id: project.id }}
      className={`group flex flex-col bg-background p-6 transition-colors hover:bg-secondary ${className}`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl font-bold tracking-tight group-hover:text-primary">
          {project.title}
        </h3>
        <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
      <p className="text-sm text-muted-foreground">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((t) => (
          <span key={t} className="border border-border px-2 py-0.5 text-xs">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-px border border-border bg-border md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-40 animate-pulse bg-background" />
      ))}
    </div>
  );
}
