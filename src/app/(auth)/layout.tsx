"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Shield, Key, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    // Check if user is already authenticated
    fetch("/api/auth/session", { signal: controller.signal })
      .then((res) => res.json())
      .then((session) => {
        if (session?.user) {
          router.push("/dashboard");
        } else {
          setIsChecking(false);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setIsChecking(false);
        }
      });

    return () => controller.abort();
  }, [router]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="h-8 w-8 rounded-md bg-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Lock className="h-full w-full p-1.5 text-primary-foreground" />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side */}
      <motion.div
        className="hidden w-1/2 flex-col justify-between border-r bg-muted/30 p-12 lg:flex"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-md bg-primary"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lock className="h-4 w-4 text-primary-foreground" />
          </motion.div>
          <span className="text-lg font-semibold tracking-tight">SecretBox</span>
        </Link>

        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-2xl font-semibold leading-tight"
            variants={fadeIn}
          >
            Secure your environment variables
          </motion.h1>
          <motion.p className="text-muted-foreground" variants={fadeIn}>
            End-to-end encrypted secrets management.
          </motion.p>

          <motion.div className="space-y-3 pt-4" variants={staggerContainer}>
            <FeatureItem icon={<Shield className="h-4 w-4" />} text="AES-256 Encryption" index={0} />
            <FeatureItem icon={<Key className="h-4 w-4" />} text="Zero Knowledge" index={1} />
            <FeatureItem icon={<Fingerprint className="h-4 w-4" />} text="2FA Support" index={2} />
            <FeatureItem icon={<Lock className="h-4 w-4" />} text="Team Sharing" index={3} />
          </motion.div>
        </motion.div>

        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Open source under MIT License
        </motion.p>
      </motion.div>

      {/* Right side - Form */}
      <div className="flex w-full flex-col lg:w-1/2">
        {/* Mobile header */}
        <motion.header
          className="border-b lg:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex h-16 items-center px-6">
            <Link href="/" className="flex items-center gap-2.5">
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-md bg-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Lock className="h-4 w-4 text-primary-foreground" />
              </motion.div>
              <span className="text-lg font-semibold tracking-tight">SecretBox</span>
            </Link>
          </div>
        </motion.header>

        <motion.main
          className="flex flex-1 items-center justify-center p-6 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-full max-w-md">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}

function FeatureItem({ icon, text, index }: { icon: React.ReactNode; text: string; index: number }) {
  return (
    <motion.div
      className="flex items-center gap-2 text-sm text-muted-foreground"
      variants={fadeIn}
      whileHover={{ x: 5, color: "hsl(var(--accent))" }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        className="text-primary"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
      >
        {icon}
      </motion.span>
      <span>{text}</span>
    </motion.div>
  );
}
