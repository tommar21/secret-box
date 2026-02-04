"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Key, Clock, Shield } from "lucide-react";
import { useVaultStore } from "@/stores/vault-store";
import { toast } from "sonner";

export default function SettingsPage() {
  const autoLockMinutes = useVaultStore((state) => state.autoLockMinutes);
  const setAutoLockMinutes = useVaultStore((state) => state.setAutoLockMinutes);
  const [localAutoLock, setLocalAutoLock] = useState(autoLockMinutes.toString());

  function handleAutoLockChange() {
    const minutes = parseInt(localAutoLock);
    if (isNaN(minutes) || minutes < 1 || minutes > 60) {
      toast.error("Please enter a number between 1 and 60");
      return;
    }
    setAutoLockMinutes(minutes);
    toast.success(`Auto-lock set to ${minutes} minutes`);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your vault and security settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Auto-lock settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Auto-Lock
            </CardTitle>
            <CardDescription>
              Automatically lock your vault after a period of inactivity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={1}
                  max={60}
                  value={localAutoLock}
                  onChange={(e) => setLocalAutoLock(e.target.value)}
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">minutes</span>
              </div>
              <Button onClick={handleAutoLockChange} variant="outline">
                Save
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Current setting: {autoLockMinutes} minutes
            </p>
          </CardContent>
        </Card>

        {/* Change master password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Master Password
            </CardTitle>
            <CardDescription>
              Your master password encrypts all your secrets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChangeMasterPasswordDialog />
          </CardContent>
        </Card>

        {/* Security info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>
              How your data is protected
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h4 className="font-medium">End-to-End Encryption</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                All your secrets are encrypted using AES-256-GCM before leaving
                your browser. We never see your data in plain text.
              </p>
            </div>
            <div className="rounded-md bg-muted p-4">
              <h4 className="font-medium">Key Derivation</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Your encryption key is derived from your master password using
                PBKDF2 with 100,000 iterations.
              </p>
            </div>
            <div className="rounded-md bg-muted p-4">
              <h4 className="font-medium">Zero Knowledge</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                If you lose your master password, we cannot recover your data.
                Make sure to keep it safe.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ChangeMasterPasswordDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    // TODO: Implement password change with re-encryption
    // This requires:
    // 1. Verify current password
    // 2. Decrypt all data with old key
    // 3. Generate new key from new password
    // 4. Re-encrypt all data with new key
    // 5. Update salt in database

    toast.info("Password change coming soon");
    setIsLoading(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Change Master Password</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Master Password</DialogTitle>
          <DialogDescription>
            This will re-encrypt all your data with a new password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="text-sm font-medium">
                Current Password
              </label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm font-medium">
                New Password
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Change Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
