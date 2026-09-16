import { useTranslations } from "next-intl";
import { Mail, MessageCircle } from "lucide-react";

import { site } from "@/data/site";

export function SupportSection() {
  const t = useTranslations("support");
  const tCommon = useTranslations("common");

  return (
    <section id="support" className="bg-surface-sunken py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          {t("h2")}
        </h2>
        <p className="mt-4 text-lg text-text-secondary">
          {t("body", {
            email: site.supportEmail,
            hours: site.responseTime,
            days: site.responseDays,
            languages: tCommon("supportLanguages"),
          })}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${site.supportEmail}`}
            className="inline-flex items-center gap-2 rounded-md border border-coral-300 bg-background px-4 py-2 text-sm font-medium text-coral-600 shadow-xs hover:bg-coral-50"
          >
            <Mail className="size-4" aria-hidden />
            {site.supportEmail}
          </a>
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-coral-300 bg-background px-4 py-2 text-sm font-medium text-coral-600 shadow-xs hover:bg-coral-50"
          >
            <MessageCircle className="size-4" aria-hidden />
            {t("whatsappButton")}
          </a>
        </div>
      </div>
    </section>
  );
}
