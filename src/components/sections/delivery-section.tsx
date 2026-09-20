import { useTranslations } from "next-intl";

import { site } from "@/data/site";

const stepKeys = ["1", "2", "3"] as const;

export function DeliverySection() {
  const t = useTranslations("delivery");

  return (
    <section className="bg-surface-sunken py-16 sm:py-24">
      <div className="mx-auto max-w-[1204px] px-4 sm:px-6 lg:px-0.5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("h2")}
          </h2>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-3">
          {stepKeys.map((key, index) => (
            <li key={key} className="flex flex-col gap-2">
              <span className="text-3xl font-bold text-coral-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold text-text-primary">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="text-sm text-text-secondary">
                {t(`steps.${key}.body`, { minutes: site.deliveryMinutes })}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-2xl border border-border-subtle bg-surface-card p-6 sm:p-8">
          <p className="font-semibold text-text-primary">{t("promise.what")}</p>
          <p className="mt-3 text-text-secondary">
            <span className="font-medium text-text-primary">{t("promise.whenLabel")}</span>{" "}
            {t("promise.whenBody", { minutes: site.deliveryMinutes })}
          </p>
          <p className="mt-3 text-text-secondary">
            <span className="font-medium text-text-primary">
              {t("promise.nothingPostedLabel")}
            </span>{" "}
            {t("promise.nothingPostedBody")}
          </p>
          <p className="mt-3 text-text-secondary">
            {t("promise.notReceived", { email: site.supportEmail })}
          </p>
        </div>
      </div>
    </section>
  );
}
