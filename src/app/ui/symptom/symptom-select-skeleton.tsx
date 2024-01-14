const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default async function SymptomSelectSkeleton() {

  return <div className="w-full max-h-48 overflow-y-scroll flex flex-col gap-1 rounded-b-md bg-gray-50">
    <span className={`${shimmer} text-neutral-500`}>
      loading...
    </span>
  </div>;
}
