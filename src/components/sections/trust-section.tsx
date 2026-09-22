import { useTranslations } from "next-intl";

import { site } from "@/data/site";

export function TrustSection() {
  const t = useTranslations("trust");

  return (
    <section className="bg-surface-page pt-16 sm:pt-24">
      <div className="mx-auto max-w-[948px] px-4 text-center sm:px-6 lg:px-0.5">
        <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          {t("h2")}
        </h2>
        <p className="mt-6 text-lg text-text-secondary">
          {t("body", { year: site.launchYear, email: site.supportEmail })}
        </p>
      </div>
    </section>
  );
}
