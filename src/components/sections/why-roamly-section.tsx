import { useTranslations } from "next-intl";
import { BadgeEuro, MessageCircle, PlaneTakeoff, ShieldCheck } from "lucide-react";

import { site } from "@/data/site";

const tiles = [
  { key: "pricing", icon: BadgeEuro },
  { key: "people", icon: MessageCircle },
  { key: "install", icon: PlaneTakeoff },
  { key: "refund", icon: ShieldCheck },
] as const;

export function WhyRoamlySection() {
  const t = useTranslations("why");
  const tCommon = useTranslations("common");

  return (
    <section className="bg-surface-page py-16 sm:py-24 relative">
      <div className="mx-auto max-w-[1460px] px-4 sm:px-6 lg:px-0.5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("h2")}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <div
              key={tile.key}
              className="rounded-2xl border border-border-subtle bg-surface-card p-6"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-coral-50">
                <tile.icon className="size-5 text-primary" aria-hidden />
              </div>
              <h3 className="mt-4 font-semibold text-text-primary">
                {t(`tiles.${tile.key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                {t(`tiles.${tile.key}.body`, {
                  hours: site.responseTime,
                  languages: tCommon("supportLanguages"),
                })}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 -bottom-5 z-10 h-10 sm:h-14 lg:h-20">
        <svg
          className="absolute inset-x-0 bottom-0 h-10 w-full text-[#EBF0F4] sm:h-14 lg:h-20"
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
