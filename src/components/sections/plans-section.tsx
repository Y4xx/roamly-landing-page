"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DestinationCard } from "@/components/shared/destination-card";
import { popularCountries, popularRegions } from "@/data/catalog";
import { site } from "@/data/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Tab = "countries" | "regions";

export function PlansSection() {
  const t = useTranslations("plans");
  const [tab, setTab] = React.useState<Tab>("countries");

  const tabs: { id: Tab; label: string }[] = [
    { id: "countries", label: t("tabs.countries") },
    { id: "regions", label: t("tabs.regions") },
  ];

  const gridEntries = tab === "regions" ? popularRegions : popularCountries;

  return (
    <section id="plans" className="bg-surface-page py-10 sm:py-24 relative">
      <div className="mx-auto max-w-365 px-4 sm:px-6 lg:px-0.5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("h2")}
          </h2>
          <p className="mt-4 text-lg text-text-secondary">{t("subhead")}</p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full bg-surface-sunken p-1">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                  tab === item.id
                    ? "border border-border-subtle bg-surface-card text-text-primary shadow-sm"
                    : "border border-transparent text-text-secondary hover:text-text-primary"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gridEntries.map((entry) => (
            <DestinationCard key={entry.slug} slug={entry.slug} name={entry.name} flag={entry.flag} />
          ))}
        </div>

        <Button variant="cta" className="mx-auto mt-10 flex items-center justify-center w-xs px-10 text-sm" asChild>
          <Link href="/shop/all-destinations">{t("viewAll")}</Link>
        </Button>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-text-secondary">
          {t("footnote", { currency: site.currency })}
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-10 sm:h-14 lg:h-20">
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
