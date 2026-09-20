import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";

import { CompatibilityChecker } from "@/components/shared/compatibility-checker";
import { Link } from "@/i18n/navigation";

const pointKeys = ["device", "dataOnly", "roaming", "wifi", "residence", "speeds"] as const;
const warningKeys = new Set(["roaming"]);

export function BeforeYouBuySection() {
  const t = useTranslations("beforeYouBuy");

  return (
    <section className="bg-surface-sunken py-16 sm:py-24">
      <div className="mx-auto max-w-[1204px] px-4 sm:px-6 lg:px-0.5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("h2")}
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <ul className="space-y-4">
            {pointKeys.map((key) => {
              const isWarning = warningKeys.has(key);
              return (
                <li
                  key={key}
                  className={
                    isWarning
                      ? "flex items-start gap-3 rounded-lg bg-warning-subtle p-4"
                      : "flex items-start gap-3"
                  }
                >
                  {isWarning && (
                    <AlertTriangle
                      className="mt-0.5 size-4 shrink-0 text-amber-600"
                      aria-hidden
                    />
                  )}
                  <p className="text-sm text-text-secondary">
                    <strong className="text-text-primary">{t(`points.${key}.strong`)}</strong>{" "}
                    {t(`points.${key}.rest`)}
                    {key === "device" && (
                      <>
                        {" "}
                        <Link href="/compatible-devices" className="text-text-link hover:underline">
                          {t("checkModel")}
                        </Link>
                      </>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-text-primary">{t("checkNow")}</h3>
            <CompatibilityChecker />
          </div>
        </div>
      </div>
    </section>
  );
}
