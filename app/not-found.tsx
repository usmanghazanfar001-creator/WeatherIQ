import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Location Not Found</h1>
      <p className="mt-3 text-muted">
        We couldn&apos;t find that location. Please check the spelling and
        try again.
      </p>
      <div className="mt-8 flex justify-center">
        <SearchBar />
      </div>
      <Link href="/" className="inline-block mt-8 text-brand-600 hover:underline text-sm">
        Back to homepage
      </Link>
    </div>
  );
}
