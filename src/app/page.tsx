import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Lock,
  Key,
  FolderSync,
  Shield,
  Zap,
  Users,
  ArrowRight,
  CheckCircle2,
  Github,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">SecretBox</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              How it works
            </Link>
            <Link href="#security" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Security
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="gradient-primary border-0 text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30">
                Get Started
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Background decoration */}
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

          <div className="container relative mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm backdrop-blur-sm animate-fade-in-up">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-muted-foreground">Now with 2FA & Team Collaboration</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up animation-delay-100">
                Secure Your
                <span className="relative mx-3 inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    Environment
                  </span>
                  <span className="absolute -bottom-1 left-0 h-3 w-full bg-primary/20 -rotate-1 rounded" />
                </span>
                Variables
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground md:text-xl animate-fade-in-up animation-delay-200">
                End-to-end encrypted secrets management for modern teams.
                Store, sync, and share environment variables securely.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up animation-delay-300">
                <Link href="/register">
                  <Button size="lg" className="gradient-primary border-0 text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105">
                    Start for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://github.com/tommar21/secret-box" target="_blank">
                  <Button variant="outline" size="lg" className="group">
                    <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    View on GitHub
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground animate-fade-in-up animation-delay-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Free forever for personal use</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Open source</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="border-t py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Everything you need to manage secrets
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Powerful features designed for developers and teams who take security seriously.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Shield className="h-6 w-6" />}
                iconBg="bg-primary/10 text-primary"
                title="End-to-End Encryption"
                description="Your secrets are encrypted in your browser using AES-256-GCM. We never see your data in plain text."
              />
              <FeatureCard
                icon={<FolderSync className="h-6 w-6" />}
                iconBg="bg-teal-500/10 text-teal-600 dark:text-teal-400"
                title="Sync Across Devices"
                description="Access your environment variables from anywhere. Changes sync automatically across all your devices."
              />
              <FeatureCard
                icon={<Key className="h-6 w-6" />}
                iconBg="bg-purple-500/10 text-purple-600 dark:text-purple-400"
                title="Global Variables"
                description="Define variables once, use them across all your projects. No more copy-pasting API keys."
              />
              <FeatureCard
                icon={<Users className="h-6 w-6" />}
                iconBg="bg-orange-500/10 text-orange-600 dark:text-orange-400"
                title="Team Collaboration"
                description="Share secrets securely with your team. Role-based access control keeps everyone on the right track."
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6" />}
                iconBg="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                title="API Access"
                description="Integrate with your CI/CD pipeline using our REST API. Generate tokens with fine-grained permissions."
              />
              <FeatureCard
                icon={<Lock className="h-6 w-6" />}
                iconBg="bg-green-500/10 text-green-600 dark:text-green-400"
                title="Two-Factor Auth"
                description="Protect your account with TOTP-based 2FA. Compatible with Google Authenticator and Authy."
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t bg-muted/30 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                How it works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Get started in three simple steps
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <StepCard
                number="1"
                title="Create your vault"
                description="Sign up and set a master password. This password encrypts all your secrets locally."
              />
              <StepCard
                number="2"
                title="Add your secrets"
                description="Create projects and add environment variables. Organize them by environment (dev, staging, prod)."
              />
              <StepCard
                number="3"
                title="Use anywhere"
                description="Export as .env files, use the API, or share with your team. Your secrets, your way."
              />
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="border-t py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border bg-card p-8 md:p-12">
                <div className="flex flex-col items-center gap-8 md:flex-row">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl gradient-primary animate-pulse-ring">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold md:text-3xl">
                      Security First Architecture
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                      SecretBox uses <strong>zero-knowledge encryption</strong>. Your master password never leaves your device.
                      All encryption and decryption happens in your browser using the Web Crypto API with
                      <strong> PBKDF2 (100,000 iterations)</strong> for key derivation and <strong>AES-256-GCM</strong> for encryption.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        Zero Knowledge
                      </span>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        AES-256-GCM
                      </span>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        PBKDF2
                      </span>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        Open Source
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t py-20 md:py-28">
          <div className="container mx-auto px-4 text-center md:px-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to secure your secrets?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
              Join developers who trust SecretBox to protect their environment variables.
            </p>
            <div className="mt-10">
              <Link href="/register">
                <Button size="lg" className="gradient-primary border-0 text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105">
                  Create your vault
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Lock className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold">SecretBox</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="https://github.com/tommar21/secret-box" target="_blank" className="transition-colors hover:text-foreground">
                GitHub
              </Link>
              <Link href="#features" className="transition-colors hover:text-foreground">
                Features
              </Link>
              <Link href="#security" className="transition-colors hover:text-foreground">
                Security
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SecretBox. Open source under MIT.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  iconBg,
  title,
  description,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative rounded-xl border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${iconBg} transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-2xl font-bold text-white shadow-lg shadow-primary/25">
        {number}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}
