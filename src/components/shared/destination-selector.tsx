"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckIcon, ChevronDownIcon, Globe2, MapPin, SearchIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRangeField } from "@/components/shared/date-range-field";
import { Flag } from "@/components/Flag";
import { useRouter } from "@/i18n/navigation";
import { catalogAll } from "@/data/catalog";
import { cn } from "@/lib/utils";

interface DestinationSelectorProps {
  className?: string;
}

function DestinationFlag({ flag, code }: { flag: string | null; code: string }) {
  return (
    <span className="inline-flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-sunken">
      {flag ? (
        <Flag code={code} className="h-full w-full object-cover" />
      ) : (
        <Globe2 className="size-3 text-text-tertiary" />
      )}
    </span>
  );
}

export function DestinationSelector({ className }: DestinationSelectorProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [destination, setDestination] = React.useState<string>("");
  const [range, setRange] = React.useState<DateRange | undefined>();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const dateFormatter = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }),
    [locale]
  );

  const tripDays =
    range?.from && range?.to
      ? Math.round((range.to.getTime() - range.from.getTime()) / 86_400_000) + 1
      : undefined;

  const triggerLabel =
    range?.from && range?.to
      ? `${dateFormatter.format(range.from)} – ${dateFormatter.format(range.to)}`
      : undefined;

  const selectedDestination = React.useMemo(
    () => catalogAll.find((d) => d.slug === destination),
    [destination]
  );

  const filteredDestinations = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalogAll;
    return catalogAll.filter((d) => d.name.toLowerCase().includes(q));
  }, [query]);

  function handleSelect(slug: string) {
    setDestination(slug);
    setOpen(false);
    setQuery("");
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setQuery("");
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    router.push(destination ? `/esim-${destination}` : "/shop/all-destinations");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full flex-col gap-3", className)}
    >
      <div>
        <label htmlFor="destination" className="sr-only">
          {t("selector.destinationLabel")}
        </label>
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <button
              id="destination"
              type="button"
              className="flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-border-subtle bg-white px-4 text-sm shadow-none outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <MapPin className="size-4 shrink-0 text-text-tertiary" />
                <span className="h-4 w-px shrink-0 bg-border-subtle" aria-hidden="true" />
                {selectedDestination ? (
                  <span className="flex min-w-0 items-center gap-2">
                    <DestinationFlag flag={selectedDestination.flag} code={selectedDestination.code} />
                    <span className="truncate">{selectedDestination.name}</span>
                  </span>
                ) : (
                  <span className="truncate text-muted-foreground">
                    {t("selector.destinationPlaceholder")}
                  </span>
                )}
              </span>
              <ChevronDownIcon className="size-4 shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-(--radix-popover-trigger-width) p-0"
          >
            <div className="flex items-center gap-2 border-b border-border-subtle px-3 py-2">
              <SearchIcon className="size-4 shrink-0 text-text-tertiary" />
              <Input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("selector.searchPlaceholder")}
                className="h-8 border-none px-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="max-h-72 overflow-y-auto p-1">
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((d) => (
                  <button
                    key={d.slug}
                    type="button"
                    onClick={() => handleSelect(d.slug)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground",
                      d.slug === destination && "bg-accent/60"
                    )}
                  >
                    <DestinationFlag flag={d.flag} code={d.code} />
                    <span className="flex-1 truncate">{d.name}</span>
                    {d.slug === destination && <CheckIcon className="size-4 shrink-0" />}
                  </button>
                ))
              ) : (
                <p className="px-2 py-4 text-center text-sm text-text-tertiary">
                  {t("selector.noResults")}
                </p>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label htmlFor="days" className="sr-only">
          {t("selector.daysLabel")}
        </label>
        <DateRangeField
          id="days"
          range={range}
          onRangeChange={setRange}
          placeholder={t("selector.daysPlaceholder")}
          applyLabel={t("selector.apply")}
          triggerLabel={triggerLabel}
          disabled={{ before: new Date() }}
          footer={
            tripDays ? (
              <span className="text-sm font-medium text-text-primary">
                {t("selector.tripSummary", { days: tripDays })}
              </span>
            ) : null
          }
        />
      </div>

      <Button type="submit" variant="cta" size="lg" className="h-11 w-full rounded-xl text-sm">
        {t("selector.submit")}
      </Button>
    </form>
  );
}
