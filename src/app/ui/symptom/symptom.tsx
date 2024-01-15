export default function Symptom({symptomName}: {symptomName: string}) {
  return (
    <div className="px-2 py-1 rounded-md bg-neutral-300">
      {symptomName}
    </div>
  );
}
