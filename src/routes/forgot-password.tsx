import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Field } from "./login";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Aditya Kumar" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const { resetPassword, configured } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      toast.success("Reset link sent — check your inbox");
    } catch (err: any) {
      toast.error(err.message ?? "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-md px-6 py-20">
        <h1 className="font-display text-4xl font-bold tracking-tighter">Reset password</h1>
        <p className="mt-2 text-sm text-muted-foreground">We'll email you a reset link.</p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <button
            type="submit"
            disabled={loading || !configured}
            className="w-full border border-primary bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground disabled:opacity-50"
          >
            {loading ? "..." : "Send reset link"}
          </button>
        </form>
        <Link to="/login" className="mt-6 inline-block text-xs text-muted-foreground hover:text-primary">
          ← Back to login
        </Link>
      </div>
    </div>
  );
}
