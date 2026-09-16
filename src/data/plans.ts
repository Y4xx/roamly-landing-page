import type { Plan } from "@/types/landing";

/**
 * Launch SKUs — placeholder pricing, replace with real aggregator cost + margin
 * before launch. Kept to 8 SKUs per the "6–8 SKUs maximum" guidance.
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
];

export function pricePerGB(plan: Plan): string {
  return (plan.priceEUR / plan.gb).toFixed(2);
}
