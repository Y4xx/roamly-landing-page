import { getTranslations, setRequestLocale } from "next-intl/server";
import { Globe2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { plans, pricePerGB } from "@/data/plans";
import { resolveCatalogPlanId } from "@/data/catalog";
import { site } from "@/data/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.checkout" });
  return { title: t("title"), robots: { index: false } };
}

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ plan?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("pages.checkout");
  const tDest = await getTranslations("destinations");
  const tPlan = await getTranslations("plans.card");

  const { plan: planId } = await searchParams;
  const legacyPlan = plans.find((p) => p.id === planId);
  const resolved = !legacyPlan && planId ? resolveCatalogPlanId(planId) : undefined;

  const checkoutItem = legacyPlan
    ? {
        flag: legacyPlan.flag as React.ReactNode,
        name: tDest(legacyPlan.destinationSlug),
        gb: legacyPlan.gb,
        days: legacyPlan.days,
        price: legacyPlan.priceEUR,
        pricePerGb: pricePerGB(legacyPlan),
      }
    : resolved
      ? {
          flag: (resolved.entry.flag ?? <Globe2 className="size-5 text-text-tertiary" />) as React.ReactNode,
          name: resolved.entry.name,
          gb: resolved.tier.gb,
          days: resolved.tier.days,
          price: resolved.tier.price,
          pricePerGb: (resolved.tier.price / resolved.tier.gb).toFixed(2),
        }
      : undefined;

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-text-primary">{t("title")}</h1>

      {checkoutItem ? (
        <div className="mt-8 rounded-2xl border border-border-subtle bg-surface-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-text-primary">
                {checkoutItem.flag} {checkoutItem.name}
              </p>
              <p className="text-sm text-text-secondary">
                {tPlan("gb", { gb: checkoutItem.gb })} · {tPlan("days", { days: checkoutItem.days })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-text-primary">
                {site.currencySymbol}
                {checkoutItem.price.toFixed(2)}
              </p>
              <p className="text-xs text-text-secondary">
                {site.currencySymbol}
                {checkoutItem.pricePerGb} / GB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-8 text-text-secondary">
          {t("empty")}{" "}
          <Link href="/#plans" className="text-text-link hover:underline">
            {t("emptyLink")}
          </Link>
        </p>
      )}

      <div className="mt-6 flex items-start gap-2 rounded-lg bg-warning-subtle p-4 text-sm text-amber-600">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
        <p>{t("notice")}</p>
      </div>

      <Button variant="cta" size="lg" className="mt-6 w-full" disabled>
        {t("continue")}
      </Button>
    </div>
  );
}
