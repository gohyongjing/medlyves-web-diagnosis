import { Condition } from "./definitions";

/**
 * Parses NextJS query params into an array of strings.
 *
 * @param rawParams Raw query param in the form of string, string[] or undefined.
 * @returns An array of params.
 */
export function parseParams(rawParams: string | string[] | undefined): string[] {
  if (Array.isArray(rawParams)) {
    return rawParams;
  } else if (typeof rawParams === 'string') {
    return [rawParams]
  }
  return []; 
}

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
  return Object.keys(counts).sort((c1, c2) => counts[c2] - counts[c1]);
}
