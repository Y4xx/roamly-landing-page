import { Check, ChevronRight, ShieldCheck, X, Zap } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { EsimPlanSelector } from "@/components/shared/esim-plan-selector";
import { findCatalogEntry } from "@/data/catalog";
import { site } from "@/data/site";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const ESIM_SLUG_PREFIX = "esim-";

function toCatalogSlug(esimSlug: string): string | null {
  if (!esimSlug.startsWith(ESIM_SLUG_PREFIX)) return null;
  return esimSlug.slice(ESIM_SLUG_PREFIX.length);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; esimSlug: string }>;
}) {
  const { locale, esimSlug } = await params;
  const catalogSlug = toCatalogSlug(esimSlug);
  const entry = catalogSlug ? findCatalogEntry(catalogSlug) : undefined;
  if (!entry) return {};
  const t = await getTranslations({ locale, namespace: "pages.esimDetail" });
  return { title: `eSIM ${entry.name} — ${t("cta")}` };
}

export default async function EsimDetailPage({
  params,
}: {
  params: Promise<{ locale: string; esimSlug: string }>;
}) {
  const { locale, esimSlug } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("pages.esimDetail");

  const catalogSlug = toCatalogSlug(esimSlug);
  const entry = catalogSlug ? findCatalogEntry(catalogSlug) : undefined;

  if (!entry) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-text-primary">{t("notFoundTitle")}</h1>
        <p className="mt-3 text-text-secondary">{t("notFoundBody")}</p>
        <Link
          href="/shop/all-destinations"
          className="mt-6 inline-block font-medium text-text-link hover:underline"
        >
          {t("backLink")}
        </Link>
      </div>
    );
  }

  const sortedTiers = [...entry.tiers].sort((a, b) => a.days - b.days);
  const featureRows: { key: "roaming" | "activation" | "pricing" | "number"; roamly: boolean; other: boolean }[] = [
    { key: "roaming", roamly: true, other: false },
    { key: "activation", roamly: true, other: false },
    { key: "pricing", roamly: true, other: false },
    { key: "number", roamly: true, other: true },
  ];
  const faqItems = ["q1", "q2", "q3", "q4"] as const;

  return (
    <div className="mx-auto max-w-365 px-4 py-10 sm:px-6 sm:py-16 lg:px-0.5">
      <nav className="flex items-center gap-1.5 text-sm text-text-secondary">
        <Link href="/shop/all-destinations" className="hover:text-text-primary hover:underline">
          {t("breadcrumbHome")}
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-text-primary">{entry.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="aspect-4/3 overflow-hidden rounded-2xl bg-surface-sunken">
          <img
            src="/images/travling-people.jpg"
            alt={entry.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            eSIM {entry.name}
          </h1>
          <p className="mt-3 text-text-secondary">
            {t("dataIncluded", { gb: entry.headline.gb })}
          </p>

          <ul className="mt-6 space-y-2.5">
            {(["noRoaming", "fastActivation", "clearData", "compatibility"] as const).map((key) => (
              <li key={key} className="flex items-start gap-2 text-sm text-text-secondary">
                <Check className="mt-0.5 size-4 shrink-0 text-cta" />
                {t(`features.${key}`)}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <EsimPlanSelector slug={entry.slug} tiers={sortedTiers} defaultDays={entry.headline.days} />
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-center text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {t("steps.title")}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {(["step1", "step2", "step3"] as const).map((step, index) => (
            <div key={step} className="rounded-2xl border border-border-subtle bg-surface-card p-6">
              <span className="text-3xl font-bold text-primary">0{index + 1}</span>
              <h3 className="mt-3 font-semibold text-text-primary">{t(`steps.${step}Title`)}</h3>
              <p className="mt-2 text-sm text-text-secondary">{t(`steps.${step}Body`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-center text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {t("compare.title")}
        </h2>
        <div className="mt-8 overflow-hidden rounded-2xl border border-border-subtle">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-sunken text-left">
                <th className="p-4 font-medium text-text-secondary">{t("compare.featureCol")}</th>
                <th className="p-4 font-medium text-primary">{t("compare.roamlyCol")}</th>
                <th className="p-4 font-medium text-text-secondary">{t("compare.otherCol")}</th>
              </tr>
            </thead>
            <tbody>
              {featureRows.map((row) => (
                <tr key={row.key} className="border-b border-border-subtle last:border-0">
                  <td className="p-4 text-text-primary">{t(`compare.rows.${row.key}`)}</td>
                  <td className="p-4">
                    {row.roamly ? (
                      <Check className="size-4 text-cta" />
                    ) : (
                      <X className="size-4 text-text-tertiary" />
                    )}
                  </td>
                  <td className="p-4">
                    {row.other ? (
                      <Check className="size-4 text-cta" />
                    ) : (
                      <X className="size-4 text-text-tertiary" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-center text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {t("pricing.title", { name: entry.name })}
        </h2>
        <div className="mx-auto mt-8 max-w-md overflow-hidden rounded-2xl border border-border-subtle">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-sunken text-left">
                <th className="p-4 font-medium text-text-secondary">{t("pricing.days")}</th>
                <th className="p-4 font-medium text-text-secondary">{t("pricing.price")}</th>
              </tr>
            </thead>
            <tbody>
              {sortedTiers.map((tier) => (
                <tr key={tier.days} className="border-b border-border-subtle last:border-0">
                  <td className="p-4 text-text-primary">
                    {tier.days} {t("pricing.days").toLowerCase()} · {t("dataIncluded", { gb: tier.gb })}
                  </td>
                  <td className="p-4 font-semibold text-text-primary">
                    {site.currencySymbol}
                    {tier.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-2xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {t("faq.title")}
        </h2>
        <div className="mt-8 space-y-3">
          {faqItems.map((key) => (
            <details
              key={key}
              className="group rounded-xl border border-border-subtle bg-surface-card p-4 open:shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between font-medium text-text-primary">
                {t(`faq.${key}`)}
              </summary>
              <p className="mt-2 text-sm text-text-secondary">{t(`faq.a${key.slice(1)}`)}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mx-auto mt-12 flex max-w-2xl items-center gap-2 text-xs text-text-tertiary">
        <ShieldCheck className="size-4" />
        <Zap className="size-4" />
      </div>
    </div>
  );
}
