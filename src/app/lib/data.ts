import axios from "axios";
import { sql } from '@vercel/postgres';
import { Condition } from "./definitions";

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
