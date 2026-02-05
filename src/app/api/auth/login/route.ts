import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { loginLimiter, getClientIp, checkRateLimit, rateLimitHeaders } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    // Check rate limit by IP
    const ip = getClientIp(req);
    const rateLimitResult = await checkRateLimit(loginLimiter, ip);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        {
          status: 429,
          headers: rateLimitHeaders(rateLimitResult.remaining ?? 0, rateLimitResult.reset ?? 0),
        }
      );
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        twoFactorEnabled: true,
      },
    });

    if (!user || !user.password) {
      // Use generic error to prevent email enumeration
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Return success with 2FA status
    // The actual session creation is handled by NextAuth signIn
    return NextResponse.json({
      success: true,
      requires2FA: user.twoFactorEnabled,
      userId: user.id,
    });
  } catch (error) {
    logger.error("Login validation error", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
