import type { CreativityMode } from "../../data/creativityRoulette";
import { interpolatePrompt } from "./interpolatePrompt";
import type { RouletteResult } from "./spin";

export type ModeAdjustedCard = {
  modeLabel: string;
  modeIntent: string;
  riskLevel: string;
  tryItNow: string;
  promptToCopy: string;
  promptTemplate: string;
  nextMove: string;
};

type ModeProfile = {
  label: string;
  intent: string;
  riskLevel: string;
  exerciseLead: string;
  exerciseClose: string;
  promptInstruction: string;
  nextLead: string;
  nextClose: string;
};

export const modeProfiles: Record<CreativityMode, ModeProfile> = {
  useful: {
    label: "Useful",
    intent: "Clear, feasible, immediate action.",
    riskLevel: "Low friction",
    exerciseLead: "Start with the smallest practical version.",
    exerciseClose:
      "Keep the version that can move forward today with the least setup and the clearest success signal.",
    promptInstruction:
      "Creative temperature: Useful. Prioritize clarity, feasibility, immediate action, practical next steps, and low-friction application. Keep ideas grounded. End with one concrete action I can do today.",
    nextLead: "Start small:",
    nextClose:
      "Make the next action small enough to finish today, then use what you learn to decide whether to expand.",
  },
  weird: {
    label: "Weird",
    intent: "Strange but workable.",
    riskLevel: "Bounded surprise",
    exerciseLead:
      "Keep the core intention, then make one part productively strange.",
    exerciseClose:
      "The strange version must still be usable: rescue the kernel that creates surprise without losing control.",
    promptInstruction:
      "Creative temperature: Weird. Make this strange but workable. Use unusual analogies, odd constraints, wrong-but-interesting ideas, failure harvesting, and bounded surprise. For every strange option, explain the usable kernel and the boundary that keeps it on target.",
    nextLead: "Use the strange part as material:",
    nextClose:
      "Try the strangest option that still has a clear use, then write what it reveals about the original idea.",
  },
  wild: {
    label: "Wild",
    intent: "Transform the frame or rules.",
    riskLevel: "Rule change",
    exerciseLead:
      "Do not only vary the idea. Change one rule, role, medium, system, or frame that defines the creative space.",
    exerciseClose:
      "Name the rule you transformed and turn the experiment into a concrete prototype, scenario, or revised brief.",
    promptInstruction:
      "Creative temperature: Wild. Prioritize radical reframing, transformational creativity, system-level change, medium shifts, role reversals, speculative scenarios, and changes to the rules of the creative space. For each option, name the rule being changed and give one concrete next action.",
    nextLead: "Change the frame on purpose:",
    nextClose:
      "Rewrite the brief around the changed rule, then prototype the smallest piece that proves the new frame can work.",
  },
};

export function getModeAdjustedCard(result: RouletteResult, topic?: string | null): ModeAdjustedCard {
  const profile = modeProfiles[result.mode];
  const promptTemplate = `${result.move.promptTemplate}\n\n${profile.promptInstruction}`;

  return {
    modeLabel: profile.label,
    modeIntent: profile.intent,
    riskLevel: profile.riskLevel,
    tryItNow: `${profile.exerciseLead} ${result.move.tryItNow} ${profile.exerciseClose}`,
    promptTemplate,
    promptToCopy: interpolatePrompt(promptTemplate, topic),
    nextMove: `${profile.nextLead} ${result.move.nextMove} ${profile.nextClose}`,
  };
}
