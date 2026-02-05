import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client - will be null if env vars not set
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Rate limiter for registration - 5 attempts per 15 minutes per IP
export const registerLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      analytics: true,
      prefix: "ratelimit:register",
    })
  : null;

// Rate limiter for vault unlock - 10 attempts per 5 minutes per user
export const unlockLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "5 m"),
      analytics: true,
      prefix: "ratelimit:unlock",
    })
  : null;

// Rate limiter for login - 5 attempts per 15 minutes per IP
export const loginLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      analytics: true,
      prefix: "ratelimit:login",
    })
  : null;

// Helper to get IP from request
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return "127.0.0.1";
}

// Helper to check rate limit and return error response if exceeded
export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{ success: boolean; remaining?: number; reset?: number }> {
  if (!limiter) {
    // If rate limiting is not configured, allow the request
    return { success: true };
  }

  try {
    const result = await limiter.limit(identifier);

    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    // If rate limiting fails (e.g., Upstash permission error), allow the request
    // This is a "fail open" approach - we don't want to block legitimate users
    // if there's an issue with the rate limiting service
    console.error("[Rate Limit] Error checking rate limit:", error);
    return { success: true, remaining: -1, reset: Date.now() };
  }
}

// Create rate limit response headers
export function rateLimitHeaders(remaining: number, reset: number): HeadersInit {
  return {
    "X-RateLimit-Remaining": remaining.toString(),
    "X-RateLimit-Reset": reset.toString(),
  };
}
