import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Aditya Kumar" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { loginEmail, loginGoogle, configured } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await loginEmail(email, password);
      toast.success("Welcome back");
      navigate({ to: "/portfolio" });
    } catch (err: any) {
      toast.error(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    try {
      await loginGoogle();
      toast.success("Welcome");
      navigate({ to: "/portfolio" });
    } catch (err: any) {
      toast.error(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-md px-6 py-20">
        <h1 className="font-display text-4xl font-bold tracking-tighter">Log in</h1>
        <p className="mt-2 text-sm text-muted-foreground">Access the full portfolio.</p>

        {!configured && (
          <div className="mt-6 border border-border bg-secondary p-4 text-xs text-muted-foreground">
            Firebase env vars not detected. Set VITE_FIREBASE_* to enable auth.
          </div>
        )}

        <button
          onClick={handleGoogle}
          disabled={loading || !configured}
          className="mt-8 flex w-full items-center justify-center gap-2 border border-border bg-secondary px-4 py-3 text-sm font-semibold uppercase tracking-wider hover:border-primary disabled:opacity-50"
        >
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleEmail} className="space-y-4">
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <Field label="Password" type="password" value={password} onChange={setPassword} required />
          <button
            type="submit"
            disabled={loading || !configured}
            className="w-full border border-primary bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground disabled:opacity-50"
          >
            {loading ? "..." : "Log in"}
          </button>
        </form>

        <div className="mt-6 flex justify-between text-xs text-muted-foreground">
          <Link to="/forgot-password" className="hover:text-primary">
            Forgot password?
          </Link>
          <Link to="/signup" className="hover:text-primary">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Field({
  label,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border bg-secondary px-3 py-2 font-sans text-sm focus:border-primary focus:outline-none"
      />
    </label>
  );
}
