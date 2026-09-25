"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { DestinationCard } from "@/components/shared/destination-card";
import type { CatalogEntry } from "@/data/catalog";
import { cn } from "@/lib/utils";

type Tab = "popular" | "regions" | "countries" | "all";

const PAGE_SIZE = 18;

interface AllDestinationsCatalogProps {
  all: CatalogEntry[];
  countries: CatalogEntry[];
  regions: CatalogEntry[];
  popular: CatalogEntry[];
}

export function AllDestinationsCatalog({ all, countries, regions, popular }: AllDestinationsCatalogProps) {
  const t = useTranslations("pages.allDestinations");
  const [query, setQuery] = React.useState("");
  const [tab, setTab] = React.useState<Tab>("all");
  const [page, setPage] = React.useState(1);

  const tabs: { id: Tab; label: string; entries: CatalogEntry[] }[] = [
    { id: "popular", label: t("tabs.popular"), entries: popular },
    { id: "regions", label: t("tabs.regions"), entries: regions },
    { id: "countries", label: t("tabs.countries"), entries: countries },
    { id: "all", label: t("tabs.all"), entries: all },
  ];

  const activeEntries = tabs.find((item) => item.id === tab)?.entries ?? all;

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return activeEntries;
    return activeEntries.filter((entry) => entry.name.toLowerCase().includes(q));
  }, [activeEntries, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  function selectTab(nextTab: Tab) {
    setTab(nextTab);
    setPage(1);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <div>
      <div className="mx-auto max-w-xl">
        <div className="relative">
          <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="h-12 w-full rounded-xl border border-border-subtle bg-surface-card pr-4 pl-11 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => selectTab(item.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              tab === item.id
                ? "border-text-primary bg-text-primary text-white"
                : "border-border-subtle bg-surface-card text-text-secondary hover:text-text-primary"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {pageItems.length > 0 ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((entry) => (
            <DestinationCard key={entry.slug} slug={entry.slug} name={entry.name} flag={entry.flag} code={entry.code} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-text-secondary">{t("empty")}</p>
      )}

      {filtered.length > 0 && (
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-text-secondary">
            {t("pagination.showing", {
              from: filtered.length === 0 ? 0 : start + 1,
              to: Math.min(start + PAGE_SIZE, filtered.length),
              total: filtered.length,
            })}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              aria-label={t("pagination.previous")}
              className="flex size-9 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:text-text-primary disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="min-w-16 text-center text-sm text-text-secondary">
              {safePage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              aria-label={t("pagination.next")}
              className="flex size-9 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:text-text-primary disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
