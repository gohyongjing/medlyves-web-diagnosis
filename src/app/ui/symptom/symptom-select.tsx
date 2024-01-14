import { fetchSymptoms } from "@/app/lib/data";
import SymptomOption from "./symptom-option";

type SymptomSelectProps = {
  query: string
}

export default async function SymptomSelect({query}: SymptomSelectProps) {
  const options = (await fetchSymptoms(query)).map(s => s.symptom);

  return <div className="w-full max-h-48 overflow-y-scroll flex flex-col gap-1 rounded-b-md bg-gray-50">
    {options.length == 0
      ? <span className="text-neutral-500">
        No results found
      </span>
      : options.map(option =>
        <SymptomOption
          key={option}
          option={option}
        >
        </SymptomOption>
      )
    }
  </div>;
}
