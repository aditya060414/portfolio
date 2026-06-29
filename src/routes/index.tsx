import { createFileRoute, Link } from "@tanstack/react-router";
import { Github, Linkedin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aditya Kumar — Full Stack Developer & AI/ML Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Aditya Kumar — B.Tech CS (AI/ML) student building MERN apps, AI agents, and shipping clean systems.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-6 py-20">
        <div className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-8 bg-primary" />
          Portfolio — v1.0
        </div>
        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tighter md:text-7xl lg:text-8xl">
          Aditya Kumar
        </h1>
        <p className="mt-6 max-w-2xl font-mono text-sm uppercase tracking-widest text-muted-foreground md:text-base">
          Full Stack Developer · AI/ML · DSA
        </p>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          B.Tech CS (AI/ML) student at Christ University. I build MERN apps, agentic AI systems,
          and ship deeply considered products.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/login"
            className="group inline-flex items-center gap-2 border border-primary bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground"
          >
            View Portfolio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="https://github.com/aditya060414"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:border-primary hover:text-primary"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/aditya060414"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:border-primary hover:text-primary"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
          {[
            ["05+", "Projects"],
            ["MERN", "Stack"],
            ["AI/ML", "Focus"],
            ["DSA", "Java"],
          ].map(([k, v]) => (
            <div key={k} className="bg-background p-6">
              <div className="font-display text-2xl font-bold text-primary">{k}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{v}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
