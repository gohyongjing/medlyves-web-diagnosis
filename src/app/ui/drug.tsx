export default function Drug({drugName}: {drugName: string}) {
  return (
    <div className="mx-2 p-1 rounded-md bg-sky-200">
      <b>
        {drugName}
      </b>
    </div>
  );
}