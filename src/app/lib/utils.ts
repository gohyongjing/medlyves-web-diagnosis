import { Condition } from "./definitions";

/**
 * Ranks the list of conditions based on number of symptoms present.
 *
 * @param conditions An array of objects describing the condition name and symptom.
 * @returns An array of condition names.
 */
export function rankByRelevance(conditions: Condition[]): string[] {
  const counts: {[condition: string]: number} = {};
  for (const entry of conditions) {
    const condition = entry.condition;
    counts[condition] = (counts[condition] ?? 0) + 1;
  }
  return Object.keys(counts).sort(c => - counts[c]);
}
