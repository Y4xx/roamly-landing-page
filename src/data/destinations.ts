import type { Destination } from "@/types/landing";
import { plans } from "@/data/plans";

/**
 * One destination per launch SKU (see `plans.ts`). Display names live in
 * `destinations.<slug>` in messages/*.json.
 */
export const destinations: Destination[] = plans.map((plan) => ({
  slug: plan.destinationSlug,
  flag: plan.flag,
}));
