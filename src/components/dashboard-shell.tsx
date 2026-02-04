"use client";

import Link from "next/link";
import { Lock, LogOut, Settings, FolderKey, Key, LockOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VaultProvider } from "./vault-provider";
import { useVaultStore } from "@/stores/vault-store";
import { signOut } from "next-auth/react";

interface DashboardShellProps {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <VaultProvider>
          <div className="container mx-auto p-6">{children}</div>
        </VaultProvider>
      </main>
    </div>
  );
}

function Sidebar({ user }: { user: { name?: string | null; email?: string | null } }) {
  const isUnlocked = useVaultStore((state) => state.isUnlocked);
  const lock = useVaultStore((state) => state.lock);

  return (
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

        {/* Vault status */}
        {isUnlocked && (
          <div className="border-t p-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={() => lock()}
            >
              <LockOpen className="h-4 w-4" />
              Lock Vault
            </Button>
          </div>
        )}

        {/* User */}
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="truncate">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
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
