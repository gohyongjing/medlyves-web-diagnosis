import Link from "next/link";
import { fetchConditions } from "../lib/data";
import Condition from "../ui/condition";
import { rankByRelevance } from "../lib/utils";
import { ButtonIcon, ChevronLeftIcon } from "@radix-ui/react-icons";

function parseSymptoms(rawSymptoms: string | string[] | undefined) {
  return Array.isArray(rawSymptoms) ? rawSymptoms : []; 
}

export default async function Conditions({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const rawConditions = await fetchConditions(parseSymptoms(searchParams['symptom']));
  const conditions = rankByRelevance(rawConditions);

  return (
    <main className="flex min-h-screen flex-col justify-center p-24">
      <div className="flex items-center text-4xl my-2">
        <Link
          href='/symptoms'
          className="mr-4 flex justify-center"
        >
          <button>
            <ChevronLeftIcon className="rounded-md border-2 border-neutral-400 bg-neutral-200 text-neutral-400 w-8 h-8"/>
          </button>
        </Link>
        {conditions.length} conditions found
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
