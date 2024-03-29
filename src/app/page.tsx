import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 text-center">
      <div className="my-8 text-4xl">
        Welcome to <Link href='/' className="text-sky-500"><b>Web Doctor</b></Link>, our web diagnosis platform!
      </div>
      <div className="text-xl">
        Learn more about potential conditions and treatments instantly before seeing a doctor
      </div>
      <Link href="/symptoms" className="m-8 py-4 px-8 text-xl rounded-md bg-sky-500 text-neutral-50 hover:bg-sky-600">
        Get Started!
      </Link>

    </main>
  )
}
