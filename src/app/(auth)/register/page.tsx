"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Check, X, AlertCircle, AlertTriangle } from "lucide-react";
import {
  validateMasterPassword,
  calculatePasswordStrength,
} from "@/lib/crypto/encryption";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordValidation = validateMasterPassword(masterPassword);
  const passwordStrength = calculatePasswordStrength(masterPassword);
  const passwordsMatch = masterPassword === confirmPassword && confirmPassword.length > 0;

  const strengthLabel = passwordStrength < 25 ? "Weak" : passwordStrength < 50 ? "Fair" : passwordStrength < 75 ? "Good" : "Strong";
  const strengthColor = passwordStrength < 25 ? "text-red-500" : passwordStrength < 50 ? "text-yellow-500" : passwordStrength < 75 ? "text-green-500" : "text-green-600";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate master password
    if (!passwordValidation.valid) {
      setError(passwordValidation.errors.join(". "));
      setIsLoading(false);
      return;
    }

    if (!passwordsMatch) {
      setError("Master passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, masterPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setIsLoading(false);
        return;
      }

      // Redirect to login
      router.push("/login?registered=true");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Create your vault
        </h1>
        <p className="text-muted-foreground">
          Set up your account and master password
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
              disabled={isLoading}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={isLoading}
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Account Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Used to log in"
            required
            disabled={isLoading}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            This is your login password (different from master password)
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="mb-4 flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
            <div className="text-sm">
              <p className="font-medium text-yellow-600 dark:text-yellow-400">Important: Master Password</p>
              <p className="mt-1 text-muted-foreground">
                Your master password encrypts all your secrets. It cannot be recovered if lost.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="masterPassword">Master Password</Label>
              <Input
                id="masterPassword"
                name="masterPassword"
                type="password"
                placeholder="Strong encryption password"
                required
                disabled={isLoading}
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
                className="h-11"
              />

              {/* Password strength indicator */}
              {masterPassword && (
                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-2 flex-1 gap-1">
                      <div
                        className={`flex-1 rounded-full transition-colors ${
                          passwordStrength >= 25 ? "bg-red-500" : "bg-muted"
                        }`}
                      />
                      <div
                        className={`flex-1 rounded-full transition-colors ${
                          passwordStrength >= 50 ? "bg-yellow-500" : "bg-muted"
                        }`}
                      />
                      <div
                        className={`flex-1 rounded-full transition-colors ${
                          passwordStrength >= 75 ? "bg-green-500" : "bg-muted"
                        }`}
                      />
                      <div
                        className={`flex-1 rounded-full transition-colors ${
                          passwordStrength >= 100 ? "bg-green-600" : "bg-muted"
                        }`}
                      />
                    </div>
                    <span className={`text-xs font-medium ${strengthColor}`}>
                      {strengthLabel}
                    </span>
                  </div>

                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    <PasswordRequirement
                      met={masterPassword.length >= 12}
                      text="12+ characters"
                    />
                    <PasswordRequirement
                      met={/[A-Z]/.test(masterPassword)}
                      text="Uppercase"
                    />
                    <PasswordRequirement
                      met={/[a-z]/.test(masterPassword)}
                      text="Lowercase"
                    />
                    <PasswordRequirement
                      met={/[0-9]/.test(masterPassword)}
                      text="Number"
                    />
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmMasterPassword">Confirm Master Password</Label>
              <Input
                id="confirmMasterPassword"
                name="confirmMasterPassword"
                type="password"
                placeholder="Confirm your master password"
                required
                disabled={isLoading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11"
              />
              {confirmPassword && (
                <div className={`flex items-center gap-1 text-xs ${passwordsMatch ? "text-green-500" : "text-muted-foreground"}`}>
                  {passwordsMatch ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                </div>
              )}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="h-11 w-full gradient-primary border-0 text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
          disabled={isLoading || !passwordValidation.valid || !passwordsMatch}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating vault...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <li className="flex items-center gap-1.5">
      {met ? (
        <Check className="h-3 w-3 text-green-500" />
      ) : (
        <X className="h-3 w-3 text-muted-foreground/50" />
      )}
      <span className={met ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
        {text}
      </span>
    </li>
  );
}
