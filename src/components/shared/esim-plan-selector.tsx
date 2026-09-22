"use client";

import * as React from "react";
import { addDays, differenceInCalendarDays, startOfDay } from "date-fns";
import { Minus, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { DateRangeField } from "@/components/shared/date-range-field";
import { buildCatalogPlanId } from "@/data/catalog";
import { site } from "@/data/site";
import { Link } from "@/i18n/navigation";
import type { GeneratedPlanTier } from "@/types/landing";

interface EsimPlanSelectorProps {
  slug: string;
  tiers: GeneratedPlanTier[];
  defaultDays: number;
}

function nearestTier(tiers: GeneratedPlanTier[], targetDays: number): GeneratedPlanTier {
  return tiers.reduce((closest, tier) =>
    Math.abs(tier.days - targetDays) < Math.abs(closest.days - targetDays) ? tier : closest
  );
}

export function EsimPlanSelector({ slug, tiers, defaultDays }: EsimPlanSelectorProps) {
  const t = useTranslations("pages.esimDetail");
  const locale = useLocale();
  const tomorrow = React.useMemo(() => startOfDay(addDays(new Date(), 1)), []);

  const [startDate, setStartDate] = React.useState<Date>(tomorrow);
  const [selectedTier, setSelectedTier] = React.useState<GeneratedPlanTier>(
    () => tiers.find((tier) => tier.days === defaultDays) ?? tiers[0]
  );
  const [quantity, setQuantity] = React.useState(1);

  const range: DateRange = {
    from: startDate,
    to: addDays(startDate, selectedTier.days - 1),
  };

  const dateFormatter = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }),
    [locale]
  );

  function handleRangeChange(next: DateRange | undefined) {
    if (!next?.from) return;

    const from = startOfDay(next.from);

    if (!next.to || differenceInCalendarDays(next.to, from) === 0) {
      // Only a start date was picked (or re-picked) — keep the current duration.
      setStartDate(from);
      return;
    }

    const requestedDays = differenceInCalendarDays(next.to, from) + 1;
    setStartDate(from);
    setSelectedTier(nearestTier(tiers, requestedDays));
  }

  const total = selectedTier.price * quantity;

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface-card p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="esim-days" className="mb-1.5 block text-sm font-medium text-text-primary">
            {t("daysLabel")}
          </label>
          <DateRangeField
            id="esim-days"
            range={range}
            onRangeChange={handleRangeChange}
            placeholder={t("daysLabel")}
            applyLabel={t("apply")}
            disabled={{ before: tomorrow }}
            triggerLabel={`${dateFormatter.format(range.from!)} – ${dateFormatter.format(range.to!)}`}
            footer={
              <span className="text-sm font-medium text-text-primary">
                {selectedTier.days} {t("pricing.days").toLowerCase()} · {t("dataIncluded", { gb: selectedTier.gb })}
              </span>
            }
          />
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-medium text-text-primary">
            {t("quantityLabel")}
          </span>
          <div className="flex h-11 items-center justify-between rounded-md border border-input px-3">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="-"
              className="text-text-secondary hover:text-text-primary"
            >
              <Minus className="size-4" />
            </button>
            <span className="text-sm font-medium text-text-primary">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              aria-label="+"
              className="text-text-secondary hover:text-text-primary"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-4">
        <span className="text-sm text-text-secondary">{t("total")}</span>
        <span className="text-2xl font-bold text-text-primary">
          {site.currencySymbol}
          {total.toFixed(2)}
        </span>
      </div>

      <Button variant="cta" size="lg" className="mt-4 w-full" asChild>
        <Link href={`/checkout?plan=${buildCatalogPlanId(slug, selectedTier.days)}&qty=${quantity}`}>
          {t("cta")}
        </Link>
      </Button>
    </div>
  );
}
