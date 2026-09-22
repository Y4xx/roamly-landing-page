"use client";

import * as React from "react";
import { arSA, fr } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { useLocale } from "next-intl";
import type { DateRange, Matcher } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const CALENDAR_LOCALES = { fr, ar: arSA } as const;

interface DateRangeFieldProps {
  id?: string;
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
  placeholder: string;
  applyLabel: string;
  triggerLabel?: React.ReactNode;
  footer?: React.ReactNode;
  disabled?: Matcher | Matcher[];
  numberOfMonths?: number;
  className?: string;
}

export function DateRangeField({
  id,
  range,
  onRangeChange,
  placeholder,
  applyLabel,
  triggerLabel,
  footer,
  disabled,
  numberOfMonths = 2,
  className,
}: DateRangeFieldProps) {
  const [open, setOpen] = React.useState(false);
  const locale = useLocale();
  const calendarLocale = CALENDAR_LOCALES[locale as keyof typeof CALENDAR_LOCALES];

  const [isSmallScreen, setIsSmallScreen] = React.useState(true);
  React.useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    setIsSmallScreen(!query.matches);
    const onChange = (event: MediaQueryListEvent) => setIsSmallScreen(!event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  const effectiveMonths = isSmallScreen ? 1 : numberOfMonths;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          className={cn(
            "flex h-11 w-full items-center gap-2 rounded-xl border border-border-subtle bg-white cursor-pointer px-4 text-left text-sm shadow-none outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
            className
          )}
        >
          <CalendarDays className="size-4 shrink-0 text-text-tertiary" />
          <span className="h-4 w-px shrink-0 bg-border-subtle" aria-hidden="true" />
          <span className={cn("min-w-0 flex-1 truncate", !triggerLabel && "text-muted-foreground")}>
            {triggerLabel ?? placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        collisionPadding={16}
        className="max-h-[85vh] w-[92vw] overflow-y-auto p-0 sm:w-auto"
      >
        <Calendar
          mode="range"
          numberOfMonths={effectiveMonths}
          selected={range}
          onSelect={onRangeChange}
          disabled={disabled}
          locale={calendarLocale}
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="p-3"
        />
        <div className="flex items-center justify-between border-t border-border-subtle p-3">
          {footer && (
            <div >
              {footer}
            </div>
          )}
          <Button type="button" size="sm" className="text-sm" onClick={() => setOpen(false)}>
            {applyLabel}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
