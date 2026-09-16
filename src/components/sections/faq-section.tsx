import { useTranslations } from "next-intl";

import { FaqAccordion } from "@/components/shared/faq-accordion";
import { faqIds } from "@/data/faq";
import { site } from "@/data/site";

export function FaqSection() {
  const t = useTranslations("faq");

  const items = faqIds.map((id) => ({
    id,
    question: t(`items.${id}.question`),
    answer: t(`items.${id}.answer`, {
      minutes: site.deliveryMinutes,
      email: site.supportEmail,
      window: site.refundWindow,
    }),
  }));

  return (
    <section id="faq" className="bg-surface-page py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("h2")}
          </h2>
        </div>

        <div className="mt-10">
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
