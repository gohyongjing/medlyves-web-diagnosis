'use client';

import * as AccessibleIcon from "@radix-ui/react-accessible-icon";
import { Cross2Icon } from "@radix-ui/react-icons";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type ClosableSymptomProps = {
  symptom: string
}

export default function ClosableSymptom({
  symptom,
}: ClosableSymptomProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();

  const symptomName = symptom.replaceAll('_', ' ');

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('symptom', symptom);
    replace(`${pathName}?${params.toString()}`);
  }

  return (
    <div className="px-2 py-1 flex gap-2 rounded-md bg-sky-400 text-neutral-50">
      <button onClick={handleClose}>
        <AccessibleIcon.Root label={`Remove ${symptomName}`}>
          <Cross2Icon className="text-neutral-50"/>
        </AccessibleIcon.Root>
      </button>
      {symptomName}
    </div>
  );
}