import { fetchSymptoms } from "@/app/lib/data";
import SymptomOption from "./symptom-option";
import ShowMoreButton from "./show-more-button";

type SymptomSelectProps = {
  query: string
  limit: number
}

export default async function SymptomSelect({query, limit}: SymptomSelectProps) {
  const options = (await fetchSymptoms(query, limit)).map(s => s.symptom);

  return <div className="w-full h-48 overflow-y-scroll flex flex-col gap-1 rounded-b-md bg-gray-50">
    {options.length == 0
      ? <span className="text-neutral-500">
        No results found
      </span>
      : <>
        {options.map(option =>
          <SymptomOption
            key={option}
            option={option}
          >
          </SymptomOption>
        )}
        {
          options.length < limit
            ? <></>
            : <ShowMoreButton
              key={limit}
              limit={limit}
            />
        }
      </>
    }
  </div>;
}
