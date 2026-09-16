import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { pricePerGB } from "@/data/plans";
import { site } from "@/data/site";
import type { Plan } from "@/types/landing";

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const t = useTranslations();

  return (
    <Card
      id={`plan-${plan.destinationSlug}`}
      className="relative flex flex-col gap-4 border-border-subtle p-6"
    >
      {plan.popular && (
        <Badge className="absolute -top-3 left-6 bg-coral-500 text-white">
          {t("plans.card.popular")}
        </Badge>
      )}

      <div className="flex items-center gap-2 text-lg font-semibold text-text-primary">
        <span aria-hidden>{plan.flag}</span>
        <span>{t(`destinations.${plan.destinationSlug}`)}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <span>{t("plans.card.gb", { gb: plan.gb })}</span>
        <span aria-hidden>·</span>
        <span>{t("plans.card.days", { days: plan.days })}</span>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-text-primary">
          {site.currencySymbol}
          {plan.priceEUR.toFixed(2)}
        </span>
        <span className="text-sm text-text-secondary">
          {t("plans.card.perGB", { price: `${site.currencySymbol}${pricePerGB(plan)}` })}
        </span>
      </div>

      <Button variant="cta" size="lg" className="mt-2 w-full" asChild>
        <Link href={`/checkout?plan=${plan.id}`}>{t("plans.card.get")}</Link>
      </Button>

      <Link
        href="/what-is-an-esim#networks"
        className="text-center text-sm text-text-link hover:underline"
      >
        {t("plans.card.networks")}
      </Link>
    </Card>
  );
}
