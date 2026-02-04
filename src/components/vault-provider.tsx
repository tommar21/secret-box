"use client";

import { useEffect } from "react";
import { useVaultStore, setupInactivityListeners } from "@/stores/vault-store";
import { UnlockVault } from "./unlock-vault";

interface VaultProviderProps {
  children: React.ReactNode;
}

export function VaultProvider({ children }: VaultProviderProps) {
  const isUnlocked = useVaultStore((state) => state.isUnlocked);

  // Setup inactivity listeners for auto-lock
  useEffect(() => {
    const cleanup = setupInactivityListeners();
    return cleanup;
  }, []);

  if (!isUnlocked) {
    return <UnlockVault />;
  }

  return <>{children}</>;
}
