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
    <section className="relative overflow-hidden bg-surface-sunken">
      <div className="mx-auto flex w-full max-w-365 flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-0.5 lg:py-20">
        <div className="w-full lg:max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            {t.rich("h1", {
              accent: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            {t("subhead", { count: 199 })}
          </p>

          <div className="mt-8">
            <DestinationSelector />
          </div>

          <ul className="mt-6 flex flex-wrap items-center gap-2">
            {chips.map((chip, index) => (
              <li
                key={chip.key}
                className="flex items-center gap-1.5 text-muted-foreground text-sm"
              >
                <span className={index === 0 ? "lg:hidden" : ""}> • </span>
                <chip.icon className="size-4" aria-hidden />

                {t(`chips.${chip.key}`)}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-text-secondary">{t("trustLine")}</p>
        </div>

        <div className="hidden lg:block lg:shrink-0">
          <img
            className="h-auto w-full max-w-155 object-cover object-top rounded-tl-4xl rounded-br-4xl shadow-lg"
            src="/images/home-hero-en.png"
            alt="Roamly hero image"
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-10 sm:h-14 lg:h-20">
        <svg
          className="absolute inset-x-0 bottom-0 h-10 w-full text-white sm:h-14 lg:h-20"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0,40 C240,100 480,0 720,50 C960,100 1200,10 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>

      <div className="absolute z-0 -right-10 -top-5 rotate-0 h-full w-60 hidden lg:block">
        <img
          className="h-auto w-full object-cover object-top"
          src="/images/tool-02.png"
          alt=""
        />
      </div>
    </section>
  );
}
