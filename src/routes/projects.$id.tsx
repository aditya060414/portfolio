import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { RequireAuth } from "@/components/RequireAuth";
import { fetchProjects } from "@/lib/portfolio-data";
import type { Project } from "@/lib/seed-data";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/projects/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${params.id} — Aditya Kumar` }],
  }),
  component: () => (
    <RequireAuth>
      <ProjectDetail />
    </RequireAuth>
  ),
});

function ProjectDetail() {
  const { id } = Route.useParams();
  const [project, setProject] = useState<Project | null | undefined>(undefined);

  useEffect(() => {
    fetchProjects().then((list) => {
      setProject(list.find((p) => p.id === id) ?? null);
    });
  }, [id]);

  if (project === undefined) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="h-8 w-48 animate-pulse bg-secondary" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h1 className="font-display text-4xl font-bold">Project not found</h1>
          <Link to="/portfolio" className="mt-4 inline-block text-primary hover:underline">
            ← Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-20">
        <Link
          to="/portfolio"
          className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-3 w-3" /> Back
        </Link>
        <div className="text-xs uppercase tracking-[0.3em] text-primary">/ project</div>
        <h1 className="mt-2 font-display text-5xl font-bold tracking-tighter md:text-7xl">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{project.description}</p>

        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="mt-10 w-full border border-border"
          />
        )}

        <div className="mt-10 border-y border-border py-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Tech Stack</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span key={t} className="border border-border px-3 py-1 text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:border-primary"
            >
              <Github className="h-4 w-4" /> Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-primary bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground"
            >
              <ExternalLink className="h-4 w-4" /> Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
