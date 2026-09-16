import { getTranslations, setRequestLocale } from "next-intl/server";

import { LegalDraftNotice } from "@/components/shared/legal-draft-notice";
import { PageShell } from "@/components/shared/page-shell";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.cookiePolicy" });
  return { title: t("title") };
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("pages.cookiePolicy");

  const rows = [
    { name: t("essentialName"), purpose: t("essentialPurpose"), disable: t("essentialDisable") },
    { name: t("analyticsName"), purpose: t("analyticsPurpose"), disable: t("analyticsDisable") },
  ];

  return (
    <PageShell title={t("title")}>
      <LegalDraftNotice />

      <section>
        <h2>{t("s1h")}</h2>
        <p>{t("s1b")}</p>
      </section>

      <section>
        <h2>{t("s2h")}</h2>
        <div className="not-prose overflow-hidden rounded-xl border border-border-subtle">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-sunken text-text-primary">
              <tr>
                <th className="p-3 font-semibold">{t("tableType")}</th>
                <th className="p-3 font-semibold">{t("tablePurpose")}</th>
                <th className="p-3 font-semibold">{t("tableDisable")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {rows.map((row) => (
                <tr key={row.name}>
                  <td className="p-3 font-medium text-text-primary">{row.name}</td>
                  <td className="p-3 text-text-secondary">{row.purpose}</td>
                  <td className="p-3 text-text-secondary">{row.disable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>{t("s3h")}</h2>
        <p>{t("s3b")}</p>
      </section>
    </PageShell>
  );
}
