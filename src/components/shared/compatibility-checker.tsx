"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deviceBrands, findModel } from "@/data/devices";
import { cn } from "@/lib/utils";

const resultIcons = {
  compatible: { icon: CheckCircle2, classes: "bg-success-subtle text-teal-600" },
  incompatible: { icon: XCircle, classes: "bg-error-subtle text-rose-600" },
  unknown: { icon: HelpCircle, classes: "bg-warning-subtle text-amber-600" },
} as const;

export function CompatibilityChecker() {
  const t = useTranslations();
  const [brand, setBrand] = React.useState<string>("");
  const [model, setModel] = React.useState<string>("");

  const models = deviceBrands.find((b) => b.brand === brand)?.models ?? [];
  const match = brand && model ? findModel(brand, model) : undefined;

  function handleBrandChange(value: string) {
    setBrand(value);
    setModel("");
  }

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface-card p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-primary">
            {t("compatibility.brandLabel")}
          </label>
          <Select value={brand} onValueChange={handleBrandChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("compatibility.brandPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {deviceBrands.map((b) => (
                <SelectItem key={b.brand} value={b.brand}>
                  {t(`devices.brands.${b.brand}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-primary">
            {t("compatibility.modelLabel")}
          </label>
          <Select value={model} onValueChange={setModel} disabled={!brand}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("compatibility.modelPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {models.map((m) => (
                <SelectItem key={m.name} value={m.name}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {match && (
        <div
          className={cn("mt-4 flex items-start gap-2 rounded-lg p-3 text-sm", resultIcons[match.result].classes)}
          role="status"
        >
          {React.createElement(resultIcons[match.result].icon, {
            className: "mt-0.5 size-4 shrink-0",
            "aria-hidden": true,
          })}
          <div>
            <p className="font-medium">{t(`compatibility.resultLabels.${match.result}`)}</p>
            {match.hasNote && (
              <p className="mt-0.5 text-text-secondary">{t(`devices.notes.${match.id}`)}</p>
            )}
          </div>
        </div>
      )}

      <p className="mt-4 border-t border-border-subtle pt-4 text-sm text-text-secondary">
        {t("compatibility.fallback")}
      </p>
    </div>
  );
}
