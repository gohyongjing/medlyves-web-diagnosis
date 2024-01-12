import Link from "next/link";
import { fetchConditions } from "../lib/data";
import Condition from "../ui/condition";

function parseSymptoms(rawSymptoms: string | string[] | undefined) {
  return Array.isArray(rawSymptoms) ? rawSymptoms : []; 
}

export default async function Conditions({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const conditions = await fetchConditions(parseSymptoms(searchParams['symptom']));

  return (
    <main className="flex min-h-screen flex-col justify-center p-24">
      <div className="text-2xl my-2">
        <Link
          href='/symptoms'
          className="px-2 mr-4 text-2xl rounded-md bg-neutral-200 self-start"
        >
          {'<'}
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
                symptoms={[]}
                key={condition}  
              />
            );
          })
        }
      </div>
    </main>
    );
}
