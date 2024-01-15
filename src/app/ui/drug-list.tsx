'use client';

import { useState } from "react";
import Drug from "./drug";

type DrugListProps = {
  drugs: string[]
}

export default function DrugList({drugs}: DrugListProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {
        !isOpen
        ? <></>
        : (
          drugs.length == 0
          ? <div className="my-2">
            No drugs available. Please consult a doctor for alternative forms of treatment.
          </div>
          : <>
              The following drugs can be used to treat this condition:
              <div className="my-2 flex flex-wrap items-start gap-2">
              {
                drugs.map(drug => (
                  <Drug
                    drugName={drug}
                    key={drug}
                  />
                ))
              }
            </div>
          </>
        )
      }
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="text-sky-500 underline hover:text-sky-600"  
      >
        {isOpen ? 'Hide':'Show'} details
      </button>
    </div>
  );
}