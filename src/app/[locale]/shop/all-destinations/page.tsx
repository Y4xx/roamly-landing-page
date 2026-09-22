import { getTranslations, setRequestLocale } from "next-intl/server";

import { AllDestinationsCatalog } from "@/components/shared/all-destinations-catalog";
import { catalogAll, catalogCountries, catalogRegions, popularDestinations } from "@/data/catalog";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.allDestinations" });
  return { title: t("title") };
}

export default async function AllDestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("pages.allDestinations");

  return (
    <div className="mx-auto max-w-365 px-4 py-16 sm:px-6 sm:py-24 lg:px-0.5">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-text-secondary">
          {t("subtitle", { count: catalogAll.length })}
        </p>
      </div>

      <div className="mt-10">
        <AllDestinationsCatalog
          all={catalogAll}
          countries={catalogCountries}
          regions={catalogRegions}
          popular={popularDestinations}
        />
      </div>
    </div>
  );
}
