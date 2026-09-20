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
      <div className="flex flex-col lg:mx-auto lg:grid lg:max-w-[1460px] lg:grid-cols-2 lg:items-center">
        <div className="mx-auto flex max-w-4xl flex-col px-4 pt-14 pb-16 text-center sm:px-6 sm:pt-20 sm:pb-24 lg:mx-0 lg:max-w-none lg:justify-center lg:px-0.5 lg:py-24 lg:text-start xl:ps-16">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            {t("h1")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary lg:mx-0">
            {t("subhead", { count: destinations.length })}
          </p>

          <div className="mx-auto mt-8 max-w-2xl lg:mx-0">
            <DestinationSelector />
          </div>

          <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2 lg:mx-0 lg:justify-start">
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

        <div className="relative h-72 w-150 sm:h-96 lg:h-full lg:pb-10">
          <div className="relative h-full w-full overflow-hidden">
            <img
              className="absolute inset-0 h-full w-full object-cover object-top"
              src="/images/home-hero-en.png"
              alt="Roamly hero image"
            />
            <svg
              className="absolute inset-x-0 bottom-0 h-10 w-full text-surface-sunken sm:h-14 lg:h-20"
              viewBox="0 0 1440 120"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M0,40 C240,100 480,0 720,50 C960,100 1200,10 1440,60 L1440,120 L0,120 Z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
