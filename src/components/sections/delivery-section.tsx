import { useTranslations } from "next-intl";

import { site } from "@/data/site";

const stepKeys = ["1", "2", "3"] as const;

export function DeliverySection() {
  const t = useTranslations("delivery");

  return (
    <section className="bg-surface-sunken py-10 sm:py-24 relative">
      <div className="mx-auto max-w-301 px-4 sm:px-6 lg:px-0.5">
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

      <div className="absolute inset-x-0 sm:-bottom-5 -bottom-0 z-10 h-10 sm:h-14 lg:h-20">
        <svg
          className="absolute inset-x-0 bottom-0 h-10 w-full text-white sm:h-14 lg:h-20"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0,40 C240,100 480,0 720,50 C960,100 1200,10 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
