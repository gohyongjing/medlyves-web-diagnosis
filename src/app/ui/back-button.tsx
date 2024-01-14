'use client';

import * as AccessibleIcon from "@radix-ui/react-accessible-icon";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type BackButtonProps = {
  href: string
  label: string
}

export default function BackButton({href, label}: BackButtonProps) {
  return (
    <Link
      href={href}
      className="mr-4 flex justify-center"
    >
      <button>
        <AccessibleIcon.Root label={label}>
          <ChevronLeftIcon className="rounded-md border-2 border-neutral-400 bg-neutral-200 text-neutral-400 w-8 h-8"/>
        </AccessibleIcon.Root>
      </button>
    </Link>
  );
}
