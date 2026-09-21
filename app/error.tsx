"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, send this to your error monitoring tool instead of
    // the console. Never render `error.message` directly to end users, as
    // it may leak internal details.
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-muted">
        We hit an unexpected error. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-xl2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 text-sm font-semibold transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
