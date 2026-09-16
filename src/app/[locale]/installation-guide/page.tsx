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
  const t = await getTranslations({ locale, namespace: "pages.installationGuide" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function InstallationGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("pages.installationGuide");

  return (
    <PageShell title={t("title")} subtitle={t("subtitle")}>
      <section>
        <h2>{t("iosTitle")}</h2>
        <ol>
          <li>{t("ios1")}</li>
          <li>{t("ios2")}</li>
          <li>{t("ios3")}</li>
          <li>{t("ios4")}</li>
          <li>{t("ios5")}</li>
        </ol>
      </section>

      <section>
        <h2>{t("androidTitle")}</h2>
        <ol>
          <li>{t("android1")}</li>
          <li>{t("android2")}</li>
          <li>{t("android3")}</li>
          <li>{t("android4")}</li>
          <li>{t("android5")}</li>
        </ol>
      </section>

      <section>
        <h2>{t("noQrTitle")}</h2>
        <p>{t("noQrBody")}</p>
      </section>

      <section>
        <h2>{t("stuckTitle")}</h2>
        <p>{t("stuckBody", { email: site.supportEmail })}</p>
      </section>
    </PageShell>
  );
}
