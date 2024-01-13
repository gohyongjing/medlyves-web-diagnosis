import { Condition } from "./definitions";

export function rankByRelevance(conditions: Condition[]) {
  const counts: {[condition: string]: number} = {};
  for (const entry of conditions) {
    const condition = entry.condition;
    counts[condition] = (counts[condition] ?? 0) + 1;
  }
  return Object.keys(counts).sort(c => - counts[c]);
}
