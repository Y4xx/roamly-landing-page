import type { Plan } from "@/types/landing";

/**
 * Launch SKUs — placeholder pricing, replace with real aggregator cost + margin
 * before launch. The original "6–8 SKUs maximum" guidance covered single-country
 * plans only; the region/cruise bundles below extend that set.
 *
 * Destination display names are translated — see `destinations.<slug>` in
 * messages/*.json, keyed by `destinationSlug`.
 */
export const plans: Plan[] = [
  { id: "europe-33-5gb-15d", destinationSlug: "europe", flag: "🇪🇺", gb: 5, days: 15, priceEUR: 14.9, popular: true },
  { id: "usa-5gb-15d", destinationSlug: "usa", flag: "🇺🇸", gb: 5, days: 15, priceEUR: 16.9 },
  { id: "uk-5gb-15d", destinationSlug: "united-kingdom", flag: "🇬🇧", gb: 5, days: 15, priceEUR: 12.9 },
  { id: "turkey-5gb-15d", destinationSlug: "turkey", flag: "🇹🇷", gb: 5, days: 15, priceEUR: 11.9 },
  { id: "morocco-5gb-15d", destinationSlug: "morocco", flag: "🇲🇦", gb: 5, days: 15, priceEUR: 13.9 },
  { id: "thailand-5gb-15d", destinationSlug: "thailand", flag: "🇹🇭", gb: 5, days: 15, priceEUR: 12.9 },
  { id: "japan-5gb-15d", destinationSlug: "japan", flag: "🇯🇵", gb: 5, days: 15, priceEUR: 15.9 },
  { id: "uae-5gb-15d", destinationSlug: "uae", flag: "🇦🇪", gb: 5, days: 15, priceEUR: 14.9 },
  { id: "caribbean-cruise-5gb-15d", destinationSlug: "caribbean-cruise", flag: "🌐", gb: 5, days: 15, priceEUR: 17.9 },
  { id: "alaska-cruise-5gb-15d", destinationSlug: "alaska-cruise", flag: "🌐", gb: 5, days: 15, priceEUR: 18.9 },
  { id: "europe-cruise-5gb-15d", destinationSlug: "europe-cruise", flag: "🌐", gb: 5, days: 15, priceEUR: 16.9 },
  { id: "mediterranean-cruise-5gb-15d", destinationSlug: "mediterranean-cruise", flag: "🌐", gb: 5, days: 15, priceEUR: 16.9 },
  { id: "hong-kong-5gb-15d", destinationSlug: "hong-kong", flag: "🌐", gb: 5, days: 15, priceEUR: 13.9 },
  { id: "africa-5gb-15d", destinationSlug: "africa", flag: "🌐", gb: 5, days: 15, priceEUR: 15.9 },
  { id: "central-america-5gb-15d", destinationSlug: "central-america", flag: "🌐", gb: 5, days: 15, priceEUR: 14.9 },
  { id: "north-america-5gb-15d", destinationSlug: "north-america", flag: "🌐", gb: 5, days: 15, priceEUR: 15.9 },
  { id: "latin-america-5gb-15d", destinationSlug: "latin-america", flag: "🌐", gb: 5, days: 15, priceEUR: 15.9 },
];

export function pricePerGB(plan: Plan): string {
  return (plan.priceEUR / plan.gb).toFixed(2);
}
