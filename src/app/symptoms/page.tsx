import SymptomSearch from "../ui/symptom/symptom-search";
import SymptomSelect from "../ui/symptom/symptom-select";
import { Suspense } from "react";
import { parseParams } from "../lib/utils";
import Symptom from "../ui/symptom/symptom";
import SymptomSelectSkeleton from "../ui/symptom/symptom-select-skeleton";
import NextButton from "../ui/buttons/next-button";

export default function Symptoms({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = parseParams(searchParams['query'])[0] ?? '';
  const symptoms = parseParams(searchParams['symptom']);
  const limit = Number(parseParams(searchParams['limit'])[0] ?? 20);
  const nextHref = `/conditions?${new URLSearchParams(symptoms.map(s => ['symptom', s]))}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <div className="m-2 text-4xl">
        What are your symptoms?
      </div>
      <div className="flex gap-2 flex-wrap">
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
        <SymptomSelect
          query={query}
          limit={limit}
        />
      </Suspense>
      <NextButton href={nextHref} />
    </main>
    );
}
