import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";

import { CompatibilityChecker } from "@/components/shared/compatibility-checker";
import { PageShell } from "@/components/shared/page-shell";
import { deviceBrands } from "@/data/devices";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const resultIcon = {
  compatible: { Icon: CheckCircle2, classes: "text-teal-600" },
  incompatible: { Icon: XCircle, classes: "text-rose-600" },
  unknown: { Icon: HelpCircle, classes: "text-amber-600" },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.compatibleDevices" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function CompatibleDevicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("pages.compatibleDevices");
  const tResult = await getTranslations("compatibility.resultLabels");
  const tBrand = await getTranslations("devices.brands");
  const tNote = await getTranslations("devices.notes");

  return (
    <PageShell title={t("title")} subtitle={t("subtitle")}>
      <div className="not-prose">
        <CompatibilityChecker />
      </div>

      <div className="not-prose mt-12 space-y-8">
        {deviceBrands.map((brand) => (
          <div key={brand.brand}>
            <h2 className="text-lg font-semibold text-text-primary">{tBrand(brand.brand)}</h2>
            <ul className="mt-3 divide-y divide-border-subtle rounded-xl border border-border-subtle">
              {brand.models.map((model) => {
                const { Icon, classes } = resultIcon[model.result];
                return (
                  <li key={model.name} className="flex items-start gap-3 p-4">
                    <Icon className={cn("mt-0.5 size-4 shrink-0", classes)} aria-hidden />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{model.name}</p>
                      <p className="text-xs text-text-tertiary">{tResult(model.result)}</p>
                      {model.hasNote && (
                        <p className="mt-0.5 text-sm text-text-secondary">
                          {tNote(model.id)}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
