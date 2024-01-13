export default function Drug({drugName}: {drugName: string}) {
  return (
    <div className="px-2 py-1 rounded-md bg-sky-200">
      <b>
        {drugName}
      </b>
    </div>
  );
}