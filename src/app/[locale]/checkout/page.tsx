import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { plans, pricePerGB } from "@/data/plans";
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
  const plan = plans.find((p) => p.id === planId);

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-text-primary">{t("title")}</h1>

      {plan ? (
        <div className="mt-8 rounded-2xl border border-border-subtle bg-surface-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-text-primary">
                {plan.flag} {tDest(plan.destinationSlug)}
              </p>
              <p className="text-sm text-text-secondary">
                {tPlan("gb", { gb: plan.gb })} · {tPlan("days", { days: plan.days })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-text-primary">
                {site.currencySymbol}
                {plan.priceEUR.toFixed(2)}
              </p>
              <p className="text-xs text-text-secondary">
                {site.currencySymbol}
                {pricePerGB(plan)} / GB
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
