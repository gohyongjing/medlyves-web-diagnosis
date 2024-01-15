'use client';

import Link from "next/link";
import { useState } from "react";

type NextButtonProps = {
  href: string
  disabled: boolean
}

export default function NextButton({
  href,
  disabled
}: NextButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setClicked(true);
    }
  }

  const disabledStyle = disabled || clicked;

  return <Link
    href={disabled ? "" : href}
    onClick={handleClick}
    className={`m-4 py-2 px-4 text-lg rounded-md ${disabledStyle ? 'disabled bg-neutral-500 text-neutral-50' : 'bg-sky-500 text-neutral-50 hover:bg-sky-600'}`}
  >
    {
      disabled
        ? 'Select a symptom before diagnosing'
        : clicked
          ? 'Diagnosing...'
          : 'Diagnose'
    }
  </Link>;
}
