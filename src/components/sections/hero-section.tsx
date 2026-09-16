import { useTranslations } from "next-intl";
import { Clock, Globe2, ShieldCheck, Smartphone } from "lucide-react";

import { DestinationSelector } from "@/components/shared/destination-selector";
import { destinations } from "@/data/destinations";

const chips = [
  { icon: Clock, key: "delivered" },
  { icon: Globe2, key: "noRoaming" },
  { icon: Smartphone, key: "ownNumber" },
  { icon: ShieldCheck, key: "checkCompatibility" },
] as const;

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="bg-surface-sunken">
      <div className="mx-auto max-w-4xl px-4 pt-14 pb-16 text-center sm:px-6 sm:pt-20 sm:pb-24 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
          {t("h1")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
          {t("subhead", { count: destinations.length })}
        </p>

        <div className="mx-auto mt-8 max-w-2xl">
          <DestinationSelector />
        </div>

        <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2">
          {chips.map((chip) => (
            <li
              key={chip.key}
              className="flex items-center gap-1.5 rounded-full bg-coral-50 px-3 py-1.5 text-sm font-medium text-coral-700"
            >
              <chip.icon className="size-4" aria-hidden />
              {t(`chips.${chip.key}`)}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-text-secondary">{t("trustLine")}</p>
      </div>
    </section>
  );
}
