import { getTranslations, setRequestLocale } from "next-intl/server";

import { CompatibilityChecker } from "@/components/shared/compatibility-checker";
import { PageShell } from "@/components/shared/page-shell";
import { plans } from "@/data/plans";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.whatIsEsim" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function WhatIsAnEsimPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("pages.whatIsEsim");
  const tDest = await getTranslations("destinations");

  return (
    <PageShell title={t("title")} subtitle={t("subtitle")}>
      <section>
        <h2>{t("s1h")}</h2>
        <p>{t("s1b")}</p>
      </section>

      <section>
        <h2>{t("s2h")}</h2>
        <p>{t("s2b")}</p>
      </section>

      <section>
        <h2>{t("s3h")}</h2>
        <p>{t("s3b")}</p>
        <div className="not-prose mt-6">
          <CompatibilityChecker />
        </div>
      </section>

      <section id="networks">
        <h2>{t("s4h")}</h2>
        <p>{t("s4b")}</p>
        <ul>
          {plans.map((plan) => (
            <li key={plan.id}>
              {plan.flag} {tDest(plan.destinationSlug)} — {t("networkConfirmed")}
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
