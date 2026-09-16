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
    <section className="bg-surface-page py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                <tile.icon className="size-5 text-coral-600" aria-hidden />
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
    </section>
  );
}
