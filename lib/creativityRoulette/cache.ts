import { createHash } from "node:crypto";
import type { CreativityMode } from "../../data/creativityRoulette";

export type PersonalizedResult = {
  tryItNow: string;
  promptToCopy: string;
  theoryUnderneath: string;
  watchOut: string;
  nextMove: string;
};

type CacheEntry = {
  expiresAt: number;
  result: PersonalizedResult;
};

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

type PersonalizationCacheGlobal = typeof globalThis & {
  __creativityRouletteCache?: Map<string, CacheEntry>;
};

function getStore(): Map<string, CacheEntry> {
  // Local/development fallback only. Replace with Redis, KV, or a database before enabling personalization in production.
  const globalStore = globalThis as PersonalizationCacheGlobal;
  globalStore.__creativityRouletteCache ??= new Map<string, CacheEntry>();
  return globalStore.__creativityRouletteCache;
}

export function normalizeCacheTopic(topic: string): string {
  return topic.trim().toLowerCase().replace(/\s+/g, " ");
}

export function createPersonalizationCacheKey(input: {
  seed: string;
  normalizedTopic: string;
  mode: CreativityMode;
  familyId: string;
  methodId: string;
  moveId: string;
}): string {
  const serialized = [
    input.seed,
    input.normalizedTopic,
    input.mode,
    input.familyId,
    input.methodId,
    input.moveId,
  ].join("|");

  return createHash("sha256").update(serialized).digest("hex");
}

export function getCachedPersonalization(key: string): PersonalizedResult | null {
  const entry = getStore().get(key);

  if (!entry) {
    return null;
  }

  if (entry.expiresAt < Date.now()) {
    getStore().delete(key);
    return null;
  }

  return entry.result;
}

export function setCachedPersonalization(
  key: string,
  result: PersonalizedResult,
  ttlMs = THIRTY_DAYS_MS
) {
  getStore().set(key, {
    expiresAt: Date.now() + ttlMs,
    result,
  });
}
