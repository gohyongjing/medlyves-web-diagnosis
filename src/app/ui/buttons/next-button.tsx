'use client';

import Link from "next/link";
import { useState } from "react";

export default function NextButton({href}: {href: string}) {
  const [clicked, setClicked] = useState(false);

  return <Link
    href={href}
    onClick={() => setClicked(true)}
    className={`m-4 py-2 px-4 text-lg rounded-md ${clicked ? 'disabled bg-neutral-500 text-neutral-50' : 'bg-sky-500 text-neutral-50 hover:bg-sky-600'}`}
  >
    {
      clicked
        ? 'Diagnosing...'
        : 'Diagnose'
    }
  </Link>;
}
