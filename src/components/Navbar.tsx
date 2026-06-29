import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";

export function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  const links = [
    { to: "/portfolio", label: "Portfolio", hash: "" },
    { to: "/portfolio", label: "About", hash: "about" },
    { to: "/portfolio", label: "Projects", hash: "projects" },
    { to: "/portfolio", label: "Skills", hash: "skills" },
    { to: "/portfolio", label: "Contact", hash: "contact" },
  ];

  async function handleLogout() {
    await logout();
    toast.success("Logged out");
    router.navigate({ to: "/" });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-display text-xl font-bold tracking-tight">
          AK<span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.hash ? `/portfolio#${l.hash}` : l.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenu((m) => !m)}
                className="flex h-9 w-9 items-center justify-center border border-border bg-secondary text-sm font-semibold uppercase hover:border-primary"
              >
                {(user.displayName || user.email || "?")[0]}
              </button>
              {menu && (
                <div className="absolute right-0 mt-2 w-48 border border-border bg-background py-1 shadow-lg">
                  <div className="border-b border-border px-3 py-2 text-xs text-muted-foreground">
                    {user.email}
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary"
                    >
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-secondary"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Login
            </Link>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.hash ? `/portfolio#${l.hash}` : l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 border-t border-border pt-3">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setOpen(false)} className="block py-2 text-sm">
                      Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="block py-2 text-sm">
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="inline-block border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
