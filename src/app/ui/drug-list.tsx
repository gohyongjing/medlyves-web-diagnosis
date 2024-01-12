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
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="text-blue-500 underline hover:text-blue-600"  
      >
        {isOpen ? 'Hide':'Show'} details
      </button>
      <div className="flex flex-wrap items-start">
        {
          isOpen
          ? (
              drugs.length == 0
              ? 'No drugs available. Please consult a doctor for alternative forms of treatment'
              : drugs.map(drug => {
                return (
                  <Drug
                    drugName={drug}
                    key={drug}
                  />
                );
              })
            )
          : <></>
        }
      </div>
    </div>
  );
}