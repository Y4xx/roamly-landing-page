export interface Destination {
  slug: string;
  flag: string;
}

export interface GeneratedPlanTier {
  days: number;
  gb: number;
  cost: number;
  price: number;
}

export interface GeneratedDestination {
  slug: string;
  name: string;
  code: string;
  flag: string | null;
  headline: GeneratedPlanTier;
  tiers: GeneratedPlanTier[];
}

export interface Plan {
  id: string;
  destinationSlug: string;
  flag: string;
  gb: number;
  days: number;
  priceEUR: number;
  popular?: boolean;
}

export type CompatibilityResult = "compatible" | "incompatible" | "unknown";

export interface DeviceModel {
  id: string;
  name: string;
  result: CompatibilityResult;
  hasNote?: boolean;
}

export interface DeviceBrand {
  brand: string;
  models: DeviceModel[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
