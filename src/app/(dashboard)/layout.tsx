import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Lock, LogOut, Settings, FolderKey, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/30">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b px-4">
            <Lock className="h-6 w-6" />
            <span className="text-xl font-bold">EnvVault</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <NavLink href="/dashboard" icon={<FolderKey className="h-4 w-4" />}>
              Projects
            </NavLink>
            <NavLink href="/dashboard/globals" icon={<Key className="h-4 w-4" />}>
              Global Variables
            </NavLink>
            <NavLink
              href="/dashboard/settings"
              icon={<Settings className="h-4 w-4" />}
            >
              Settings
            </NavLink>
          </nav>

          {/* User */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="truncate">
                <p className="text-sm font-medium">{session.user?.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {session.user?.email}
                </p>
              </div>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button variant="ghost" size="icon" type="submit">
                  <LogOut className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {icon}
      {children}
    </Link>
  );
}
