'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ShowMoreButton({limit}: {limit: number}) {
  const [clicked, setClicked] = useState(false);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleShowMore = () => {
    setClicked(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', (limit + 20).toString());
    replace(`${pathName}?${params.toString()}`, {scroll: false});
  }

  return (clicked
    ? <span className="text-neutral-500">
      loading...
    </span>
    : <button
      onClick={handleShowMore}
      className="underline text-sky-500"
    >
      Show more
    </button>
  );
}
