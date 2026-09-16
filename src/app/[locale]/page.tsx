import { setRequestLocale } from "next-intl/server";

import { BeforeYouBuySection } from "@/components/sections/before-you-buy-section";
import { DeliverySection } from "@/components/sections/delivery-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PaymentSecuritySection } from "@/components/sections/payment-security-section";
import { PlansSection } from "@/components/sections/plans-section";
import { SupportSection } from "@/components/sections/support-section";
import { TrustSection } from "@/components/sections/trust-section";
import { WhyRoamlySection } from "@/components/sections/why-roamly-section";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <HeroSection />
      <PlansSection />
      <DeliverySection />
      <PaymentSecuritySection />
      <WhyRoamlySection />
      <BeforeYouBuySection />
      <TrustSection />
      <FaqSection />
      <SupportSection />
      <FinalCtaSection />
    </>
  );
}
