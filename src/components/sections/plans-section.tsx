import { useTranslations } from "next-intl";

import { PlanCard } from "@/components/shared/plan-card";
import { plans } from "@/data/plans";
import { site } from "@/data/site";

export function PlansSection() {
  const t = useTranslations("plans");

  return (
    <section id="plans" className="bg-surface-page py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("h2")}
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            {t("subhead", { currency: site.currency })}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-text-secondary">
          {t("footnote", { currency: site.currency })}
        </p>
      </div>
    </section>
  );
}
