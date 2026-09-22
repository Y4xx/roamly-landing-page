"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangeField } from "@/components/shared/date-range-field";
import { useRouter } from "@/i18n/navigation";
import { catalogAll } from "@/data/catalog";
import { cn } from "@/lib/utils";

interface DestinationSelectorProps {
  className?: string;
}

export function DestinationSelector({ className }: DestinationSelectorProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [destination, setDestination] = React.useState<string>("");
  const [range, setRange] = React.useState<DateRange | undefined>();

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
        <Select value={destination} onValueChange={setDestination}>
          <SelectTrigger
            id="destination"
            className="h-11 w-full rounded-xl border-border-subtle px-4 text-sm shadow-none data-[size=default]:h-11"
            size="default"
          >
            <span className="flex min-w-0 flex-1 items-center gap-2">
              <MapPin className="size-4 shrink-0 text-text-tertiary" />
              <span className="h-4 w-px shrink-0 bg-border-subtle" aria-hidden="true" />
              <SelectValue placeholder={t("selector.destinationPlaceholder")} />
            </span>
          </SelectTrigger>
          <SelectContent>
            {catalogAll.map((d) => (
              <SelectItem key={d.slug} value={d.slug}>
                <span className="mr-1">{d.flag ?? "🌐"}</span> {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
