import { generatedCountries } from "@/data/countries-generated";
import { generatedRegions } from "@/data/regions-generated";
import type { GeneratedDestination, GeneratedPlanTier } from "@/types/landing";

export type CatalogKind = "country" | "region";

export interface CatalogEntry extends GeneratedDestination {
  kind: CatalogKind;
}

export const catalogCountries: CatalogEntry[] = generatedCountries.map((c) => ({
  ...c,
  kind: "country",
}));

export const catalogRegions: CatalogEntry[] = generatedRegions.map((r) => ({
  ...r,
  kind: "region",
}));

export const catalogAll: CatalogEntry[] = [...catalogCountries, ...catalogRegions];

export function findCatalogEntry(slug: string): CatalogEntry | undefined {
  return catalogAll.find((entry) => entry.slug === slug);
}

export const POPULAR_COUNTRY_SLUGS = [
  "united-states",
  "united-kingdom",
  "turkey",
  "morocco",
  "thailand",
  "japan",
  "united-arab-emirates",
  "france",
  "spain",
];

export const POPULAR_REGION_SLUGS = [
  "europe",
  "africa",
  "asia-20-areas",
  "middle-east",
  "gulf-region",
  "north-america",
  "south-america",
  "oceania-8-areas",
  "global-120-areas",
];

export const popularCountries = POPULAR_COUNTRY_SLUGS.map((slug) =>
  catalogCountries.find((c) => c.slug === slug)
).filter((c): c is CatalogEntry => Boolean(c));

export const popularRegions = POPULAR_REGION_SLUGS.map((slug) =>
  catalogRegions.find((r) => r.slug === slug)
).filter((r): r is CatalogEntry => Boolean(r));

export const popularDestinations = [...popularCountries, ...popularRegions];

const CATALOG_PLAN_PREFIX = "catalog";

export function buildCatalogPlanId(slug: string, days: number): string {
  return `${CATALOG_PLAN_PREFIX}__${slug}__${days}`;
}

export interface ResolvedCatalogPlan {
  entry: CatalogEntry;
  tier: GeneratedPlanTier;
}

export function resolveCatalogPlanId(id: string): ResolvedCatalogPlan | undefined {
  const parts = id.split("__");
  if (parts.length !== 3 || parts[0] !== CATALOG_PLAN_PREFIX) return undefined;
  const [, slug, daysRaw] = parts;
  const days = Number.parseInt(daysRaw, 10);
  const entry = findCatalogEntry(slug);
  if (!entry || Number.isNaN(days)) return undefined;
  const tier = entry.tiers.find((t) => t.days === days);
  if (!tier) return undefined;
  return { entry, tier };
}
