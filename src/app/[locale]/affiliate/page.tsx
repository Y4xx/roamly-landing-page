import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageShell } from "@/components/shared/page-shell";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.affiliate" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function AffiliatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("pages.affiliate");

  return (
    <PageShell title={t("title")} subtitle={t("subtitle")}>
      <p>{t("body", { email: site.supportEmail })}</p>
    </PageShell>
  );
}
