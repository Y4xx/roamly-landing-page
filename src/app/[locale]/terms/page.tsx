import { getTranslations, setRequestLocale } from "next-intl/server";

import { LegalDraftNotice } from "@/components/shared/legal-draft-notice";
import { PageShell } from "@/components/shared/page-shell";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.terms" });
  return { title: t("title") };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("pages.terms");

  const entityValues = {
    entity: site.legalEntity,
    registration: site.legalRegistration,
    address: site.legalAddress,
  };

  return (
    <PageShell title={t("title")}>
      <LegalDraftNotice />

      <section>
        <h2>{t("s1h")}</h2>
        <p>{t("s1b", entityValues)}</p>
      </section>
      <section>
        <h2>{t("s2h")}</h2>
        <p>{t("s2b")}</p>
      </section>
      <section>
        <h2>{t("s3h")}</h2>
        <p>{t("s3b", { minutes: site.deliveryMinutes })}</p>
      </section>
      <section>
        <h2>{t("s4h")}</h2>
        <p>{t("s4b")}</p>
      </section>
      <section>
        <h2>{t("s5h")}</h2>
        <p>{t("s5b", { descriptor: site.billingDescriptor })}</p>
      </section>
      <section>
        <h2>{t("s6h")}</h2>
        <p>{t("s6b")}</p>
      </section>
      <section>
        <h2>{t("s7h")}</h2>
        <p>{t("s7b", { email: site.supportEmail })}</p>
      </section>
    </PageShell>
  );
}
