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
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("pages.about");

  return (
    <PageShell title={t("title")} subtitle={t("subtitle")}>
      <section>
        <h2>{t("s1h")}</h2>
        <p>{t("s1b", { year: site.launchYear })}</p>
      </section>
      <section>
        <h2>{t("s2h")}</h2>
        <p>{t("s2b")}</p>
      </section>
      <section>
        <h2>{t("s3h")}</h2>
        <p>{t("s3b", { email: site.supportEmail })}</p>
      </section>
    </PageShell>
  );
}
