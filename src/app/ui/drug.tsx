export default function Drug({drugName}: {drugName: string}) {
  return (
    <div className="m-2 p-1 rounded-md bg-sky-200">
      <b>
        {drugName}
      </b>
    </div>
  );
}