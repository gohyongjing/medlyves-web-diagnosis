import axios from "axios";

export async function fetchConditions(symptoms: string[]) {
  return ['Pneumonia', 'Allergy', 'Common Cold', 'New Disease'];
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
