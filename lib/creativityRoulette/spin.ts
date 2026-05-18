import type { CreativityFamily, CreativityMode } from "../../data/creativityRoulette";

export type RouletteSelection = {
  seed: string;
  mode: CreativityMode;
  familyId: string;
  methodId: string;
  moveId: string;
};

export type RouletteResult = {
  seed: string;
  mode: CreativityMode;
  family: CreativityFamily;
  method: CreativityFamily["methods"][number];
  move: CreativityFamily["methods"][number]["moves"][number];
};

type RandomGenerator = () => number;

function xmur3(seed: string): () => number {
  let h = 1779033703 ^ seed.length;

  for (let i = 0; i < seed.length; i += 1) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }

  return function hash() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function mulberry32(a: number): RandomGenerator {
  return function random() {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createSeed(prefix = "spin"): string {
  const cryptoObject =
    typeof globalThis !== "undefined" && "crypto" in globalThis
      ? globalThis.crypto
      : undefined;

  if (cryptoObject && "getRandomValues" in cryptoObject) {
    const values = new Uint32Array(4);
    cryptoObject.getRandomValues(values);
    return `${prefix}-${Array.from(values)
      .map((value) => value.toString(36))
      .join("-")}`;
  }

  return `${prefix}-${Date.now().toString(36)}-${performance.now().toString(36)}`;
}

export function seededRandom(seed: string): RandomGenerator {
  const seedHash = xmur3(seed);
  return mulberry32(seedHash());
}

function pick<T>(items: T[], random: RandomGenerator): T {
  if (items.length === 0) {
    throw new Error("Cannot pick from an empty list.");
  }

  return items[Math.floor(random() * items.length)];
}

export function findRouletteResult(
  families: CreativityFamily[],
  selection: RouletteSelection
): RouletteResult | null {
  const family = families.find((item) => item.id === selection.familyId);
  const method = family?.methods.find((item) => item.id === selection.methodId);
  const move = method?.moves.find((item) => item.id === selection.moveId);

  if (!family || !method || !move) {
    return null;
  }

  return {
    seed: selection.seed,
    mode: selection.mode,
    family,
    method,
    move,
  };
}

export function spinRoulette(
  families: CreativityFamily[],
  mode: CreativityMode,
  seed = createSeed()
): RouletteResult {
  if (families.length === 0) {
    throw new Error("Creativity roulette dataset is empty.");
  }

  const random = seededRandom(`${seed}:${mode}`);
  const eligibleFamilies = families
    .map((familyItem) => ({
      ...familyItem,
      methods: familyItem.methods
        .map((methodItem) => ({
          ...methodItem,
          moves: methodItem.moves.filter((moveItem) => moveItem.modeAffinity.includes(mode)),
        }))
        .filter((methodItem) => methodItem.moves.length > 0),
    }))
    .filter((familyItem) => familyItem.methods.length > 0);

  if (eligibleFamilies.length === 0) {
    throw new Error(`No creativity roulette moves are eligible for mode "${mode}".`);
  }

  const family = pick(eligibleFamilies, random);
  const method = pick(family.methods, random);
  const move = pick(method.moves, random);

  return {
    seed,
    mode,
    family,
    method,
    move,
  };
}

export function toSelection(result: RouletteResult): RouletteSelection {
  return {
    seed: result.seed,
    mode: result.mode,
    familyId: result.family.id,
    methodId: result.method.id,
    moveId: result.move.id,
  };
}

export function isCreativityMode(value: unknown): value is CreativityMode {
  return value === "useful" || value === "weird" || value === "wild";
}
