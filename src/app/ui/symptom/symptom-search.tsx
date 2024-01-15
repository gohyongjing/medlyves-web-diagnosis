'use client';

import { ChangeEvent } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SymptomSearch() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleTextChange = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set('limit', String(20));
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`);
  }, 300);

  return <input
    className="w-full mt-2 px-2 py-1 bg-gray-50 rounded-t-md border-b"
    placeholder="Search symptoms"
    defaultValue={searchParams.get('query')?.toString()}
    onChange={handleTextChange}
  />;
}
