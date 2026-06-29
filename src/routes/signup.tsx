import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Field } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Aditya Kumar" }] }),
  component: SignupPage,
});

function SignupPage() {
  const { signupEmail, configured } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signupEmail(name, email, password);
      toast.success("Account created");
      navigate({ to: "/portfolio" });
    } catch (err: any) {
      toast.error(err.message ?? "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-md px-6 py-20">
        <h1 className="font-display text-4xl font-bold tracking-tighter">Sign up</h1>
        <p className="mt-2 text-sm text-muted-foreground">Create an account to view the portfolio.</p>

        {!configured && (
          <div className="mt-6 border border-border bg-secondary p-4 text-xs text-muted-foreground">
            Firebase env vars not detected.
          </div>
        )}

        <form onSubmit={submit} className="mt-8 space-y-4">
          <Field label="Name" type="text" value={name} onChange={setName} required />
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <Field label="Password" type="password" value={password} onChange={setPassword} required />
          <button
            type="submit"
            disabled={loading || !configured}
            className="w-full border border-primary bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground disabled:opacity-50"
          >
            {loading ? "..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
