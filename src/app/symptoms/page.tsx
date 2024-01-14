import Link from "next/link";
import SymptomSearch from "../ui/symptom/symptom-search";
import SymptomSelect from "../ui/symptom/symptom-select";
import { Suspense } from "react";
import { parseParams } from "../lib/utils";
import Symptom from "../ui/symptom/symptom";
import SymptomSelectSkeleton from "../ui/symptom/symptom-select-skeleton";

export default function Symptoms({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = parseParams(searchParams['query'])[0] ?? '';
  const symptoms = parseParams(searchParams['symptom']);
  const nextParams = `/conditions?${new URLSearchParams(symptoms.map(s => ['symptom', s]))}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <div className="m-2 text-4xl">
        What are your symptoms?
      </div>
      <div className="flex gap-2">
        {
          symptoms.map(symptom => (
            <Symptom
              key={symptom} 
              symptomName={symptom}
            />
          ))
        }
      </div>
      <SymptomSearch />
      <Suspense key={query} fallback={<SymptomSelectSkeleton />}>
        <SymptomSelect query={query} />
      </Suspense>
      <Link
        href={nextParams}
        className="m-4 py-2 px-4 text-lg rounded-md bg-sky-500 text-neutral-50 hover:bg-sky-600"
      >
        Diagnose
      </Link>
    </main>
    );
}
