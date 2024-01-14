import axios from "axios";
import { sql } from '@vercel/postgres';
import { Condition } from "./definitions";

export async function fetchSymptoms(query: string, limit: number = 20) {
  try {
    const data = await sql<{symptom: string}>`
      SELECT DISTINCT symptom FROM conditions
      WHERE symptom ILIKE ${`%${query}%`}
      ORDER BY symptom
      LIMIT ${limit};
    `;
    return data.rows;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

/**
 * Fetches all condition symptom pairs from the database that involves any of the
 * specified symptoms.
 *
 * @param symptoms Array of symptoms to check for.
 * @returns Array of objects describing the condition name and symptom.
 */
export async function fetchConditions(symptoms: string[]): Promise<Condition[]> {
  try {
    const nestedConditions = await Promise.all(symptoms.map(async symptom => {
      const data = await sql<Condition>`
        SELECT * FROM conditions
        WHERE symptom = ${symptom};
      `;
      return data.rows;
    }));
    return nestedConditions.flat();
  } catch (error) {
    console.log('Error:', error);
    return [];
  }
}

/**
 * Fetches the array of drugs for treatment for a specified condition.
 *
 * @param condition Condition to find drugs for.
 * @returns Array of drugs if successfully fetched, an empty array otherwise.
 */
export async function fetchDrugs(condition: string): Promise<string[]> {
  return axios.get(`https://candidate-assignment-5hohk5qryq-as.a.run.app/getDrugs/${condition}`)
    .then(response => {
      const drugs = response.data;
      return Array.isArray(drugs) ? drugs as string[] : [];
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status == '404') {
          // condition not found
        } else {
          console.log(error.response);
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error:', error.message);
      }
      return [];
    });
}
