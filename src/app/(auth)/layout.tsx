import Link from "next/link";
import { Lock, Shield, Key, Fingerprint } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Decorative */}
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-primary via-primary/90 to-purple-600 p-12 text-white lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
            <Lock className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold">SecretBox</span>
        </Link>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Secure your environment variables with confidence
          </h1>
          <p className="text-lg text-white/80">
            End-to-end encrypted secrets management for developers and teams.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <FeatureItem icon={<Shield className="h-5 w-5" />} text="AES-256 Encryption" />
            <FeatureItem icon={<Key className="h-5 w-5" />} text="Zero Knowledge" />
            <FeatureItem icon={<Fingerprint className="h-5 w-5" />} text="2FA Support" />
            <FeatureItem icon={<Lock className="h-5 w-5" />} text="Team Sharing" />
          </div>
        </div>

        <p className="text-sm text-white/60">
          &copy; {new Date().getFullYear()} SecretBox. Open source under MIT.
        </p>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full flex-col lg:w-1/2">
        {/* Mobile header */}
        <header className="border-b lg:hidden">
          <div className="flex h-16 items-center px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">SecretBox</span>
            </Link>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 backdrop-blur-sm">
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
