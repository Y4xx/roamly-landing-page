import { useTranslations } from "next-intl";
import { Lock, ShieldCheck } from "lucide-react";

import { site } from "@/data/site";

const paymentMethods = ["Visa", "Mastercard", "American Express", "Apple Pay", "Google Pay"];
const bulletKeys = ["1", "2", "3", "4"] as const;

export function PaymentSecuritySection() {
  const t = useTranslations("payment");

  return (
    <section className="bg-surface-sunken py-16 sm:py-24">
      <div className="mx-auto max-w-[1076px] px-4 sm:px-6 lg:px-0.5">
        <div className="rounded-2xl border border-border-subtle bg-surface-card p-6 sm:p-10">
          <div className="flex items-center gap-2">
            <Lock className="size-5 text-teal-500" aria-hidden />
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">{t("h2")}</h2>
          </div>

          <ul className="mt-6 space-y-3 text-text-secondary">
            {bulletKeys.map((key) => (
              <li key={key}>
                {t(`bullets.${key}`, {
                  currency: site.currency,
                  descriptor: site.billingDescriptor,
                })}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-md border border-border-subtle bg-surface-sunken px-3 py-1.5 text-sm font-medium text-text-secondary"
              >
                {method}
              </span>
            ))}
            <span className="flex items-center gap-1.5 rounded-md border border-border-subtle bg-surface-sunken px-3 py-1.5 text-sm font-medium text-text-secondary">
              <ShieldCheck className="size-4 text-teal-500" aria-hidden />
              {t("pciBadge")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
