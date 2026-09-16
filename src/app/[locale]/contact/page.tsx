import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, MessageCircle } from "lucide-react";

import { PageShell } from "@/components/shared/page-shell";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("pages.contact");
  const tCommon = await getTranslations("common");

  return (
    <PageShell
      title={t("title")}
      subtitle={t("subtitle", {
        hours: site.responseTime,
        days: site.responseDays,
        languages: tCommon("supportLanguages"),
      })}
    >
      <div className="not-prose grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${site.supportEmail}`}
          className="flex items-center gap-3 rounded-xl border border-border-subtle bg-surface-card p-5 hover:border-coral-300"
        >
          <Mail className="size-5 text-coral-600" aria-hidden />
          <div>
            <p className="font-medium text-text-primary">{t("emailLabel")}</p>
            <p className="text-sm text-text-secondary">{site.supportEmail}</p>
          </div>
        </a>
        <a
          href={site.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border border-border-subtle bg-surface-card p-5 hover:border-coral-300"
        >
          <MessageCircle className="size-5 text-coral-600" aria-hidden />
          <div>
            <p className="font-medium text-text-primary">{t("whatsappLabel")}</p>
            <p className="text-sm text-text-secondary">{t("whatsappSub")}</p>
          </div>
        </a>
      </div>

      <p className="mt-8 text-sm">{t("orderNote")}</p>
    </PageShell>
  );
}
