"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Check, X } from "lucide-react";
import {
  validateMasterPassword,
  calculatePasswordStrength,
} from "@/lib/crypto/encryption";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [masterPassword, setMasterPassword] = useState("");

  const passwordValidation = validateMasterPassword(masterPassword);
  const passwordStrength = calculatePasswordStrength(masterPassword);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmMasterPassword = formData.get(
      "confirmMasterPassword"
    ) as string;

    // Validate master password
    if (!passwordValidation.valid) {
      setError(passwordValidation.errors.join(". "));
      setIsLoading(false);
      return;
    }

    if (masterPassword !== confirmMasterPassword) {
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create your vault</CardTitle>
        <CardDescription>
          Set up your account and master password
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
              disabled={isLoading}
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
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Account Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Used to log in to your account
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="masterPassword">Master Password</Label>
            <Input
              id="masterPassword"
              name="masterPassword"
              type="password"
              required
              disabled={isLoading}
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Used to encrypt your secrets. Cannot be recovered if lost!
            </p>

            {/* Password strength indicator */}
            {masterPassword && (
              <div className="space-y-2">
                <div className="flex h-2 gap-1">
                  <div
                    className={`flex-1 rounded ${
                      passwordStrength >= 25
                        ? "bg-red-500"
                        : "bg-muted"
                    }`}
                  />
                  <div
                    className={`flex-1 rounded ${
                      passwordStrength >= 50
                        ? "bg-yellow-500"
                        : "bg-muted"
                    }`}
                  />
                  <div
                    className={`flex-1 rounded ${
                      passwordStrength >= 75
                        ? "bg-green-500"
                        : "bg-muted"
                    }`}
                  />
                  <div
                    className={`flex-1 rounded ${
                      passwordStrength >= 100
                        ? "bg-green-600"
                        : "bg-muted"
                    }`}
                  />
                </div>
                <ul className="space-y-1 text-xs">
                  <PasswordRequirement
                    met={masterPassword.length >= 12}
                    text="At least 12 characters"
                  />
                  <PasswordRequirement
                    met={/[A-Z]/.test(masterPassword)}
                    text="One uppercase letter"
                  />
                  <PasswordRequirement
                    met={/[a-z]/.test(masterPassword)}
                    text="One lowercase letter"
                  />
                  <PasswordRequirement
                    met={/[0-9]/.test(masterPassword)}
                    text="One number"
                  />
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmMasterPassword">
              Confirm Master Password
            </Label>
            <Input
              id="confirmMasterPassword"
              name="confirmMasterPassword"
              type="password"
              required
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !passwordValidation.valid}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <li className="flex items-center gap-2">
      {met ? (
        <Check className="h-3 w-3 text-green-500" />
      ) : (
        <X className="h-3 w-3 text-muted-foreground" />
      )}
      <span className={met ? "text-green-500" : "text-muted-foreground"}>
        {text}
      </span>
    </li>
  );
}
