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
  const t = await getTranslations({ locale, namespace: "pages.privacy" });
  return { title: t("title") };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("pages.privacy");

  return (
    <PageShell title={t("title")}>
      <LegalDraftNotice />

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
        <ul>
          <li>{t("s3l1")}</li>
          <li>{t("s3l2")}</li>
          <li>{t("s3l3")}</li>
        </ul>
      </section>
      <section>
        <h2>{t("s4h")}</h2>
        <p>{t("s4b", { email: site.supportEmail })}</p>
      </section>
      <section>
        <h2>{t("s5h")}</h2>
        <p>{t("s5b")}</p>
      </section>
    </PageShell>
  );
}
