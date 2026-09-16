"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "@/i18n/navigation";
import { destinations } from "@/data/destinations";
import { cn } from "@/lib/utils";

const tripLengthValues = ["7", "15", "30", "31"] as const;

interface DestinationSelectorProps {
  className?: string;
}

export function DestinationSelector({ className }: DestinationSelectorProps) {
  const t = useTranslations();
  const router = useRouter();
  const [destination, setDestination] = React.useState<string>("");
  const [days, setDays] = React.useState<string>("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const anchor = destination ? `plan-${destination}` : "plans";
    router.push(`/#${anchor}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full flex-col gap-3 rounded-2xl border border-border-subtle bg-surface-card p-3 shadow-lg sm:flex-row sm:items-end",
        className
      )}
    >
      <div className="flex-1">
        <label
          htmlFor="destination"
          className="mb-1.5 block text-sm font-medium text-text-primary"
        >
          {t("selector.destinationLabel")}
        </label>
        <Select value={destination} onValueChange={setDestination}>
          <SelectTrigger id="destination" className="h-11 w-full" size="default">
            <Search className="text-text-tertiary" />
            <SelectValue placeholder={t("selector.destinationPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            {destinations.map((d) => (
              <SelectItem key={d.slug} value={d.slug}>
                <span className="mr-1">{d.flag}</span> {t(`destinations.${d.slug}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label htmlFor="days" className="mb-1.5 block text-sm font-medium text-text-primary">
          {t("selector.daysLabel")}
        </label>
        <Select value={days} onValueChange={setDays}>
          <SelectTrigger id="days" className="h-11 w-full" size="default">
            <SelectValue placeholder={t("selector.daysPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            {tripLengthValues.map((value) => (
              <SelectItem key={value} value={value}>
                {t(`selector.tripLengths.${value}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" variant="cta" size="lg" className="sm:w-auto">
        {t("selector.submit")}
      </Button>
    </form>
  );
}
