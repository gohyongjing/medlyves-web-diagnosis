import SymptomSearch from "../ui/symptom/symptom-search";
import SymptomSelect from "../ui/symptom/symptom-select";
import { Suspense } from "react";
import { parseParams } from "../lib/utils";
import SymptomSelectSkeleton from "../ui/symptom/symptom-select-skeleton";
import NextButton from "../ui/buttons/next-button";
import ClosableSymptom from "../ui/symptom/closable-symptom";

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
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-24 sm:p-24 text-center">
      <div className="m-2 text-4xl">
        What are your symptoms?
      </div>
      <div className="my-4 self-start flex justify-start gap-2 flex-wrap">
        {
          symptoms.map(symptom => (
            <ClosableSymptom
              key={symptom} 
              symptom={symptom}
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
      <NextButton href={nextHref} disabled={symptoms.length == 0}/>
    </main>
    );
}
