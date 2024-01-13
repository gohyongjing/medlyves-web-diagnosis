import { fetchDrugs } from "../lib/data"
import Drug from "./drug";
import DrugList from "./drug-list";
import Symptom from "./symptom";

type ConditionProps = {
  conditionName: string,
  symptoms: string[]
}

export default async function Condition({
  conditionName,
  symptoms
}: ConditionProps) {
  const drugs = await fetchDrugs(conditionName);

  return (
    <div className="my-2 p-4 border-2 flex flex-col gap-4 border-neutral-200 bg-neutral-200 rounded-md">
      <div className="text-lg">
        <b>{conditionName}</b>
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
      <DrugList
        drugs={drugs}
      />
    </div>
  )
}
