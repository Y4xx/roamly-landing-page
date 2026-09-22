import { useTranslations } from "next-intl";
import { Mail, MessageCircle } from "lucide-react";

import { site } from "@/data/site";

export function SupportSection() {
  const t = useTranslations("support");
  const tCommon = useTranslations("common");

  return (
    <section id="support" className="bg-primary/20 pb-16 sm:pb-24 pt-8 sm:pt-18 relative">
      <div className="mx-auto max-w-[852px] px-4 text-center sm:px-6 lg:px-0.5">
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
            className="inline-flex items-center gap-2 rounded-md border border-coral-300 bg-primary px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-coral-50 hover:text-primary"
          >
            <Mail className="size-4" aria-hidden />
            {site.supportEmail}
          </a>
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-coral-300 bg-primary px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-coral-50 hover:text-primary"
          >
            <MessageCircle className="size-4" aria-hidden />
            {t("whatsappButton")}
          </a>
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 z-10 h-10 sm:h-14 lg:h-20">
        <svg
          className="absolute inset-x-0 -top-10 lg:-top-20 h-10 w-full text-primary/20 sm:h-14 lg:h-20"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0,40 C240,100 480,0 720,50 C960,100 1200,10 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-10 sm:h-14 lg:h-20">
        <svg
          className="absolute inset-x-0 -bottom-5 h-10 w-full text-white sm:h-14 lg:h-20"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0,40 C240,100 480,0 720,50 C960,100 1200,10 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
