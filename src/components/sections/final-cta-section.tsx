import { useTranslations } from "next-intl";

import { DestinationSelector } from "@/components/shared/destination-selector";

export function FinalCtaSection() {
  const t = useTranslations("finalCta");

  return (
    <section className="py-16 sm:py-24 pb-10">
      <div className="mx-auto max-w-[948px] px-4 text-center sm:px-6 lg:px-0.5">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("h2")}</h2>
        <p className="mt-4 text-lg ">{t("subhead")}</p>

        <div className="mx-auto mt-8 max-w-2xl">
          <DestinationSelector />
        </div>
      </div>
    </section>
  );
}
