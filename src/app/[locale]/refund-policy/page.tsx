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
  const t = await getTranslations({ locale, namespace: "pages.refundPolicy" });
  return { title: t("title") };
}

export default async function RefundPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("pages.refundPolicy");

  return (
    <PageShell title={t("title")}>
      <LegalDraftNotice />

      <section>
        <h2>{t("s1h")}</h2>
        <ul>
          <li>{t("s1l1")}</li>
          <li>{t("s1l2")}</li>
          <li>{t("s1l3")}</li>
        </ul>
      </section>
      <section>
        <h2>{t("s2h")}</h2>
        <p>{t("s2b")}</p>
      </section>
      <section>
        <h2>{t("s3h")}</h2>
        <p>{t("s3b", { email: site.supportEmail, hours: site.responseTime })}</p>
      </section>
      <section>
        <h2>{t("s4h")}</h2>
        <p>{t("s4b", { window: site.refundWindow })}</p>
      </section>
    </PageShell>
  );
}
