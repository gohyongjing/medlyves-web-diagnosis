'use client';

import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SymptomOption({option}: {option: string}) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleCheckedChange = (checked: boolean | 'indeterminate') => {
    const params = new URLSearchParams(searchParams);
    if (checked === true) {
      params.append('symptom', option); 
    } else {
      params.delete('symptom', option);
    }
    replace(`${pathName}?${params.toString()}`);
  }

  return <div className="flex justify-stretch items-stretch hover:bg-sky-200">
    <Checkbox.Root
      checked={searchParams.getAll('symptom').includes(option)}
      onCheckedChange={handleCheckedChange}
      id={option}
      className="my-1 mx-2 w-4 h-4 flex justify-center items-center border border-neutral-500 rounded-md"
    >
      <Checkbox.Indicator >
        <CheckIcon className="text-neutral-500"/>
      </Checkbox.Indicator>
    </Checkbox.Root>
    <label htmlFor={option} className="flex-1 text-start cursor-pointer">
      {option.replaceAll('_', ' ')}
    </label>
  </div>;
}
