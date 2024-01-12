import { fetchDrugs } from "../lib/data"
import Drug from "./drug";

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
    <div className="my-2 p-2 border-2 border-neutral-200 bg-neutral-200 rounded-md">
      <div className="text-lg">
        <b>{conditionName}</b>
      </div>
      <div className="flex">
        {
          symptoms.map(symptom => <div key={symptom}>{symptom}</div>)
        }
      </div>
      <div className="flex">
        {
          drugs.map(drug => {
          return (
            <Drug
              drugName="drug"
              key={drug}
            />);
          })
        }
      </div>
    </div>
  )
}
