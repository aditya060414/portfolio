import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";

export function RequireAuth({ children, admin = false }: { children: ReactNode; admin?: boolean }) {
  const { user, isAdmin, loading, configured } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!configured) return;
    if (!user) {
      navigate({ to: "/login" });
    } else if (admin && !isAdmin) {
      navigate({ to: "/portfolio" });
    }
  }, [loading, user, isAdmin, admin, configured, navigate]);

  if (!configured) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24">
        <h1 className="font-display text-3xl font-bold">Firebase not configured</h1>
        <p className="mt-4 text-muted-foreground">
          Add your Firebase web config as <code className="bg-secondary px-1">VITE_FIREBASE_*</code> env vars to enable auth and database.
        </p>
        <ul className="mt-4 list-disc pl-5 text-sm text-muted-foreground">
          <li>VITE_FIREBASE_API_KEY</li>
          <li>VITE_FIREBASE_AUTH_DOMAIN</li>
          <li>VITE_FIREBASE_PROJECT_ID</li>
          <li>VITE_FIREBASE_STORAGE_BUCKET</li>
          <li>VITE_FIREBASE_MESSAGING_SENDER_ID</li>
          <li>VITE_FIREBASE_APP_ID</li>
        </ul>
      </div>
    );
  }

  if (loading || !user || (admin && !isAdmin)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-2 w-32 animate-pulse bg-secondary" />
      </div>
    );
  }
  return <>{children}</>;
}
