'use client';

import Link from "next/link";
import { useState } from "react";

function buildQuery(symptoms: string[]) {
  return `/conditions?${symptoms.map(s => `symptom=${s}`).join('&')}`;
}

export default function Symptoms() {
  const [selected, setSelected] = useState(['abc', 'def', 'sadf']);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <div className="m-2 text-4xl">
        What are your symptoms?
      </div>
      <select className="m-8 w-80 text-lg">
        <option value='option1'>option1</option>
        <option value='option2'>option2</option>
        <option value='option3'>option3</option>
      </select>
      <Link
        href={buildQuery(selected)}
        className="m-4 py-2 px-4 text-lg border-2 rounded-md bg-sky-500 text-neutral-50 hover:bg-sky-600"
      >
        Diagnose
      </Link>
    </main>
    );
}
