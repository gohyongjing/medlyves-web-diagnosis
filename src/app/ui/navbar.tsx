import { CardStackPlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function NavBar() {
  return <nav className="fixed top-0 w-full bg-inherit p-4 border-b border-zinc-200">
    <Link href={'/'} className="flex items-center gap-2 text-sky-500 hover:text-sky-600">
      <CardStackPlusIcon className="w-8 h-8"/>
      <b>
        Web Doc
      </b>
    </Link>
  </nav>;
}