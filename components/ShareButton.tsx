"use client";

import { useState } from "react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    const title = document.title;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // User cancelled the share sheet — nothing to do.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — silently ignore.
    }
  }

  return (
    <button
      onClick={share}
      aria-label="Share weather"
      className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-muted hover:text-slate-900 dark:hover:text-white transition-colors relative"
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="15" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="5" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="15" cy="15" r="2.2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6.9 8.9 13.1 6.1M6.9 11.1l6.2 2.8" stroke="currentColor" strokeWidth="1.3" />
      </svg>
      {copied && (
        <span className="absolute -bottom-8 right-0 text-xs bg-slate-900 text-white px-2 py-1 rounded-md whitespace-nowrap">
          Link copied
        </span>
      )}
    </button>
  );
}
