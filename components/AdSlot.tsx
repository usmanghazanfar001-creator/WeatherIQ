/**
 * Reusable ad placement. Renders nothing until AdSense is actually
 * configured — no fake or placeholder ads, per AdSense policy.
 *
 * To enable later:
 * 1. Add NEXT_PUBLIC_ADSENSE_CLIENT_ID to your environment.
 * 2. Load the AdSense script once in app/layout.tsx.
 * 3. Replace the null-return below with an <ins class="adsbygoogle"> unit
 *    sized for the `slot` passed in, and call (window.adsbygoogle =
 *    window.adsbygoogle || []).push({}) in a client-side effect.
 *
 * Keep every ad slot clearly separated from navigation and weather
 * controls so it can never be mistaken for part of the UI or produce
 * accidental clicks.
 */
export function AdSlot({ slot }: { slot: string }) {
  const enabled = Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID);

  if (!enabled) return null;

  // Placeholder for future real implementation — intentionally inert.
  return <div data-ad-slot={slot} aria-hidden="true" />;
}
