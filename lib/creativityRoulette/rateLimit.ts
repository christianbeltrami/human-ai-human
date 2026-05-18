import { createHash, randomUUID } from "node:crypto";

type Counter = {
  count: number;
  resetAt: number;
};

type RateLimitStore = {
  visitor: Map<string, Counter>;
  global: Map<string, Counter>;
};

type RateLimitGlobal = typeof globalThis & {
  __creativityRouletteRateLimits?: RateLimitStore;
};

export type RateLimitConfig = {
  maxPerVisitorPerDay: number;
  maxGlobalPerDay: number;
  maxGlobalPerMonth: number;
};

export type RateLimitResult = {
  allowed: boolean;
  reason?: "visitor-day" | "global-day" | "global-month";
};

const DAY_MS = 24 * 60 * 60 * 1000;

function getStore(): RateLimitStore {
  // Local/development fallback only. Replace with Redis, KV, or a database before enabling personalization in production.
  const globalStore = globalThis as RateLimitGlobal;
  globalStore.__creativityRouletteRateLimits ??= {
    visitor: new Map<string, Counter>(),
    global: new Map<string, Counter>(),
  };
  return globalStore.__creativityRouletteRateLimits;
}

function monthResetAt(now: Date): number {
  return new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime();
}

function incrementCounter(map: Map<string, Counter>, key: string, limit: number, resetAt: number): boolean {
  const now = Date.now();
  const existing = map.get(key);

  if (!existing || existing.resetAt <= now) {
    map.set(key, { count: 1, resetAt });
    return true;
  }

  if (existing.count >= limit) {
    return false;
  }

  existing.count += 1;
  return true;
}

export function hashVisitorIdentifier(identifier: string): string {
  return createHash("sha256").update(identifier).digest("hex");
}

export function getOrCreateVisitorId(request: Request): {
  visitorId: string;
  cookieHeader: string | null;
} {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/(?:^|;\s*)creativity_visitor=([^;]+)/);
  const visitorId = match?.[1] ?? randomUUID();

  return {
    visitorId,
    cookieHeader: match
      ? null
      : `creativity_visitor=${visitorId}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`,
  };
}

export function checkPersonalizationRateLimit(
  visitorIdentifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const store = getStore();
  const now = new Date();
  const dayKey = now.toISOString().slice(0, 10);
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const visitorHash = hashVisitorIdentifier(visitorIdentifier);
  const dayReset = Date.now() + DAY_MS;
  const monthReset = monthResetAt(now);

  if (
    !incrementCounter(
      store.visitor,
      `${visitorHash}:${dayKey}`,
      config.maxPerVisitorPerDay,
      dayReset
    )
  ) {
    return { allowed: false, reason: "visitor-day" };
  }

  if (!incrementCounter(store.global, `day:${dayKey}`, config.maxGlobalPerDay, dayReset)) {
    return { allowed: false, reason: "global-day" };
  }

  if (!incrementCounter(store.global, `month:${monthKey}`, config.maxGlobalPerMonth, monthReset)) {
    return { allowed: false, reason: "global-month" };
  }

  return { allowed: true };
}
