import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { RequireAuth } from "@/components/RequireAuth";
import {
  fetchProjects,
  fetchSkills,
  fetchAchievements,
  fetchSetting,
  fetchContacts,
  saveProject,
  deleteProject,
  saveSkill,
  deleteSkill,
  saveAchievement,
  deleteAchievement,
  saveSetting,
  saveContact,
  deleteContact,
} from "@/lib/portfolio-data";
import {
  SKILL_CATEGORIES,
  CONTACT_ICONS,
  type Project,
  type Skill,
  type Achievement,
  type Contact,
} from "@/lib/seed-data";
import { toast } from "sonner";
import { Trash2, Plus, Save } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Aditya Kumar" }] }),
  component: () => (
    <RequireAuth admin>
      <AdminPage />
    </RequireAuth>
  ),
});

function AdminPage() {
  const [tab, setTab] = useState<"projects" | "skills" | "achievements" | "contacts" | "settings">("projects");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-xs uppercase tracking-[0.3em] text-primary">/ admin</div>
        <h1 className="mt-2 font-display text-5xl font-bold tracking-tighter">Dashboard</h1>

        <div className="mt-8 flex flex-wrap gap-px border border-border bg-border">
          {(["projects", "skills", "achievements", "contacts", "settings"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 bg-background px-4 py-2 text-xs font-semibold uppercase tracking-widest ${
                tab === t ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "projects" && <ProjectsAdmin />}
          {tab === "skills" && <SkillsAdmin />}
          {tab === "achievements" && <AchievementsAdmin />}
          {tab === "contacts" && <ContactsAdmin />}
          {tab === "settings" && <SettingsAdmin />}
        </div>
      </div>
    </div>
  );
}

function ProjectsAdmin() {
  const [items, setItems] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetchProjects().then((p) => {
      setItems(p);
      setLoaded(true);
    });
  }, []);

  function addNew() {
    setItems([
      ...items,
      {
        id: `new-${Date.now()}`,
        title: "New Project",
        description: "",
        techStack: [],
        githubUrl: "",
        liveUrl: "",
        imageUrl: "",
        orderIndex: items.length + 1,
      },
    ]);
  }

  async function save(p: Project) {
    try {
      await saveProject(p);
      toast.success("Project saved");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  async function remove(id: string) {
    try {
      await deleteProject(id);
      setItems(items.filter((i) => i.id !== id));
      toast.success("Deleted");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  if (!loaded) return <div className="h-40 animate-pulse bg-secondary" />;

  return (
    <div className="space-y-4">
      {items.map((p, idx) => (
        <div key={p.id} className="border border-border p-6">
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              label="Title"
              value={p.title}
              onChange={(v) => setItems(items.map((i, j) => (j === idx ? { ...i, title: v } : i)))}
            />
            <Input
              label="Order"
              type="number"
              value={String(p.orderIndex)}
              onChange={(v) =>
                setItems(items.map((i, j) => (j === idx ? { ...i, orderIndex: Number(v) } : i)))
              }
            />
            <div className="md:col-span-2">
              <Input
                label="Description"
                value={p.description}
                onChange={(v) =>
                  setItems(items.map((i, j) => (j === idx ? { ...i, description: v } : i)))
                }
              />
            </div>
            <Input
              label="Tech Stack (comma separated)"
              value={p.techStack.join(", ")}
              onChange={(v) =>
                setItems(
                  items.map((i, j) =>
                    j === idx
                      ? { ...i, techStack: v.split(",").map((s) => s.trim()).filter(Boolean) }
                      : i,
                  ),
                )
              }
            />
            <Input
              label="Image URL"
              value={p.imageUrl}
              onChange={(v) => setItems(items.map((i, j) => (j === idx ? { ...i, imageUrl: v } : i)))}
            />
            <Input
              label="GitHub URL"
              value={p.githubUrl}
              onChange={(v) =>
                setItems(items.map((i, j) => (j === idx ? { ...i, githubUrl: v } : i)))
              }
            />
            <Input
              label="Live URL"
              value={p.liveUrl}
              onChange={(v) => setItems(items.map((i, j) => (j === idx ? { ...i, liveUrl: v } : i)))}
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => save(p)}
              className="flex items-center gap-1 border border-primary bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground"
            >
              <Save className="h-3 w-3" /> Save
            </button>
            <button
              onClick={() => remove(p.id)}
              className="flex items-center gap-1 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:border-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" /> Delete
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={addNew}
        className="flex w-full items-center justify-center gap-2 border border-dashed border-border py-4 text-sm uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary"
      >
        <Plus className="h-4 w-4" /> Add Project
      </button>
    </div>
  );
}

function SkillsAdmin() {
  const [items, setItems] = useState<Skill[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string>(SKILL_CATEGORIES[0]);
  useEffect(() => {
    fetchSkills().then(setItems);
  }, []);

  async function add() {
    if (!name) return;
    const s: Skill = { id: `s-${Date.now()}`, name, category };
    try {
      await saveSkill(s);
      setItems([...items, s]);
      setName("");
      toast.success("Skill added");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  async function remove(id: string) {
    try {
      await deleteSkill(id);
      setItems(items.filter((i) => i.id !== id));
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="border border-border p-6">
        <div className="grid gap-3 md:grid-cols-3">
          <Input label="Name" value={name} onChange={setName} />
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Category
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-border bg-secondary px-3 py-2 text-sm"
            >
              {SKILL_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <button
            onClick={add}
            className="self-end border border-primary bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground"
          >
            Add Skill
          </button>
        </div>
      </div>
      <div className="grid gap-px border border-border bg-border md:grid-cols-2">
        {SKILL_CATEGORIES.map((cat) => {
          const subset = items.filter((s) => s.category === cat);
          if (!subset.length) return null;
          return (
            <div key={cat} className="bg-background p-4">
              <div className="mb-3 text-xs uppercase tracking-widest text-primary">{cat}</div>
              <div className="flex flex-wrap gap-2">
                {subset.map((s) => (
                  <span key={s.id} className="flex items-center gap-2 border border-border px-3 py-1 text-sm">
                    {s.name}
                    <button onClick={() => remove(s.id)} aria-label="Remove">
                      <Trash2 className="h-3 w-3 hover:text-destructive" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AchievementsAdmin() {
  const [items, setItems] = useState<Achievement[]>([]);
  useEffect(() => {
    fetchAchievements().then(setItems);
  }, []);

  function addNew() {
    setItems([
      ...items,
      {
        id: `a-${Date.now()}`,
        title: "",
        description: "",
        year: "",
        orderIndex: items.length + 1,
      },
    ]);
  }

  async function save(a: Achievement) {
    try {
      await saveAchievement(a);
      toast.success("Saved");
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  async function remove(id: string) {
    try {
      await deleteAchievement(id);
      setItems(items.filter((i) => i.id !== id));
      toast.success("Deleted");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <div className="space-y-4">
      {items.map((a, idx) => (
        <div key={a.id} className="border border-border p-6">
          <div className="grid gap-3 md:grid-cols-3">
            <Input
              label="Year"
              value={a.year}
              onChange={(v) => setItems(items.map((i, j) => (j === idx ? { ...i, year: v } : i)))}
            />
            <div className="md:col-span-2">
              <Input
                label="Title"
                value={a.title}
                onChange={(v) => setItems(items.map((i, j) => (j === idx ? { ...i, title: v } : i)))}
              />
            </div>
            <div className="md:col-span-3">
              <Input
                label="Description"
                value={a.description}
                onChange={(v) =>
                  setItems(items.map((i, j) => (j === idx ? { ...i, description: v } : i)))
                }
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => save(a)}
              className="flex items-center gap-1 border border-primary bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground"
            >
              <Save className="h-3 w-3" /> Save
            </button>
            <button
              onClick={() => remove(a.id)}
              className="flex items-center gap-1 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:border-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" /> Delete
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={addNew}
        className="flex w-full items-center justify-center gap-2 border border-dashed border-border py-4 text-sm uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary"
      >
        <Plus className="h-4 w-4" /> Add Entry
      </button>
    </div>
  );
}

function ContactsAdmin() {
  const [items, setItems] = useState<Contact[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetchContacts().then((c) => {
      setItems(c);
      setLoaded(true);
    });
  }, []);

  function addNew() {
    setItems([
      ...items,
      {
        id: `c-${Date.now()}`,
        label: "",
        value: "",
        url: "",
        icon: "mail",
        orderIndex: items.length + 1,
      },
    ]);
  }

  async function save(c: Contact) {
    if (!c.label || !c.url) {
      toast.error("Label and URL are required");
      return;
    }
    try {
      await saveContact(c);
      toast.success("Contact saved");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  async function remove(id: string) {
    try {
      await deleteContact(id);
      setItems(items.filter((i) => i.id !== id));
      toast.success("Deleted");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  if (!loaded) return <div className="h-40 animate-pulse bg-secondary" />;

  return (
    <div className="space-y-4">
      {items.map((c, idx) => (
        <div key={c.id} className="border border-border p-6">
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              label="Label"
              value={c.label}
              onChange={(v) => setItems(items.map((i, j) => (j === idx ? { ...i, label: v } : i)))}
            />
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Icon
              </span>
              <select
                value={c.icon}
                onChange={(e) =>
                  setItems(
                    items.map((i, j) =>
                      j === idx ? { ...i, icon: e.target.value as Contact["icon"] } : i,
                    ),
                  )
                }
                className="w-full border border-border bg-secondary px-3 py-2 text-sm"
              >
                {CONTACT_ICONS.map((ic) => (
                  <option key={ic}>{ic}</option>
                ))}
              </select>
            </label>
            <Input
              label="Display Value"
              value={c.value}
              onChange={(v) => setItems(items.map((i, j) => (j === idx ? { ...i, value: v } : i)))}
            />
            <Input
              label="URL (mailto:, https://, tel:)"
              value={c.url}
              onChange={(v) => setItems(items.map((i, j) => (j === idx ? { ...i, url: v } : i)))}
            />
            <Input
              label="Order"
              type="number"
              value={String(c.orderIndex)}
              onChange={(v) =>
                setItems(items.map((i, j) => (j === idx ? { ...i, orderIndex: Number(v) } : i)))
              }
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => save(c)}
              className="flex items-center gap-1 border border-primary bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground"
            >
              <Save className="h-3 w-3" /> Save
            </button>
            <button
              onClick={() => remove(c.id)}
              className="flex items-center gap-1 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:border-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" /> Delete
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={addNew}
        className="flex w-full items-center justify-center gap-2 border border-dashed border-border py-4 text-sm uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary"
      >
        <Plus className="h-4 w-4" /> Add Contact
      </button>
    </div>
  );
}


function SettingsAdmin() {
  const [bio, setBio] = useState("");
  const [resume, setResume] = useState("");
  useEffect(() => {
    fetchSetting("bio").then(setBio);
    fetchSetting("resume_url").then(setResume);
  }, []);

  return (
    <div className="space-y-6">
      <div className="border border-border p-6">
        <label className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Bio
        </label>
        <textarea
          rows={6}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border border-border bg-secondary p-3 text-sm focus:border-primary focus:outline-none"
        />
        <button
          onClick={async () => {
            await saveSetting("bio", bio);
            toast.success("Bio saved");
          }}
          className="mt-3 border border-primary bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground"
        >
          Save Bio
        </button>
      </div>
      <div className="border border-border p-6">
        <Input label="Resume URL" value={resume} onChange={setResume} />
        <button
          onClick={async () => {
            await saveSetting("resume_url", resume);
            toast.success("Resume URL saved");
          }}
          className="mt-3 border border-primary bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground"
        >
          Save URL
        </button>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border bg-secondary px-3 py-2 text-sm focus:border-primary focus:outline-none"
      />
    </label>
  );
}
