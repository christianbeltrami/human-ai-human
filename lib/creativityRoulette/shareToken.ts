import { isCreativityMode, type RouletteSelection } from "./spin";

declare const Buffer: {
  from(
    value: string,
    encoding: "utf8" | "base64url"
  ): {
    toString(encoding: "base64url" | "utf8"): string;
  };
};

type EncodedSelection = {
  v: 1;
  s: string;
  m: string;
  f: string;
  t: string;
  c: string;
};

function toBase64Url(value: string): string {
  if (typeof btoa === "function") {
    return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }

  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

  if (typeof atob === "function") {
    return atob(padded);
  }

  return Buffer.from(value, "base64url").toString("utf8");
}

export function encodeShareToken(selection: RouletteSelection): string {
  const payload: EncodedSelection = {
    v: 1,
    s: selection.seed,
    m: selection.mode,
    f: selection.familyId,
    t: selection.methodId,
    c: selection.moveId,
  };

  return toBase64Url(JSON.stringify(payload));
}

export function decodeShareToken(token: string | null | undefined): RouletteSelection | null {
  if (!token || token.length > 1500) {
    return null;
  }

  try {
    const parsed = JSON.parse(fromBase64Url(token)) as Partial<EncodedSelection>;

    if (
      parsed.v !== 1 ||
      typeof parsed.s !== "string" ||
      !isCreativityMode(parsed.m) ||
      typeof parsed.f !== "string" ||
      typeof parsed.t !== "string" ||
      typeof parsed.c !== "string"
    ) {
      return null;
    }

    return {
      seed: parsed.s,
      mode: parsed.m,
      familyId: parsed.f,
      methodId: parsed.t,
      moveId: parsed.c,
    };
  } catch {
    return null;
  }
}

export function createShareUrl(currentUrl: string, selection: RouletteSelection): string {
  const url = new URL(currentUrl);
  url.searchParams.set("spin", encodeShareToken(selection));
  return url.toString();
}
