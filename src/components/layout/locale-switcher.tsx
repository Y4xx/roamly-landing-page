"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Select
      value={locale}
      onValueChange={(next) => router.replace(pathname, { locale: next })}
    >
      <SelectTrigger
        aria-label={t("label")}
        size="sm"
        className="w-auto gap-1.5 border-none shadow-none hover:bg-surface-sunken"
      >
        <Globe className="size-4 text-text-secondary" aria-hidden />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {t(loc)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
