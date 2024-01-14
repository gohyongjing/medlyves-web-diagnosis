import { fetchConditions } from "../lib/data";
import Condition from "../ui/condition";
import { parseParams, rankByRelevance } from "../lib/utils";
import BackButton from "../ui/buttons/back-button";

export default async function Conditions({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const symptoms = parseParams(searchParams['symptom']);
  const rawConditions = await fetchConditions(symptoms);
  const conditions = rankByRelevance(rawConditions);
  const backHref = `/symptoms?${new URLSearchParams(symptoms.map(s => ['symptom', s]))}`;

  return (
    <main className="flex min-h-screen flex-col justify-center p-24">
      <div className="flex items-center text-4xl my-2">
        <BackButton
          href={backHref}
          label="Back"
        />
        {conditions.length} condition{conditions.length > 1 ? 's' : ''} found
      </div>
      <div>
        Click on each medical condition to find out more.
      </div>
      <div>
        {
          conditions.map(condition => {
            return (
              <Condition
                conditionName={condition}
                symptoms={rawConditions
                  .filter(entry => entry.condition == condition)
                  .map(entry => entry.symptom)
                }
                key={condition}  
              />
            );
          })
        }
      </div>
    </main>
    );
}
